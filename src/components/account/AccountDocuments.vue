<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { supabase } from '../../supabaseClient';

// --- Состояния компонента ---
const kycStatus = ref('не начата'); // 'не начата', 'в обработке', 'одобрена', 'отклонена'
const userId = ref(null);
const isSubmitting = ref(false);

const documents = reactive({
  identity: {
    title: 'Документ, удостоверяющий личность',
    description: 'Паспорт, ID-карта или водительское удостоверение. Файл должен быть в цвете.',
    file: null,
    status: 'empty',
    progress: 0,
    url: null,
    error: ''
  },
  address: {
    title: 'Подтверждение адреса проживания',
    description: 'Счёт за коммунальные услуги или выписка из банка (не старше 3 месяцев).',
    file: null,
    status: 'empty',
    progress: 0,
    url: null,
    error: ''
  }
});

// --- Логика компонента ---
onMounted(async () => {
  const savedUserId = localStorage.getItem('user-id');
  if (!savedUserId) {
    console.error("ID пользователя не найден в localStorage.");
    return;
  }
  userId.value = savedUserId;

  // 1. Загружаем статус и URL документов из базы данных
  const { data, error } = await supabase
    .from('profiles')
    .select('kyc_status, id_document_url, address_document_url')
    .eq('id', userId.value)
    .single();

  if (error) {
    console.error("Ошибка при загрузке статуса KYC из базы данных:", error);
    return;
  }
  
  if (data) {
    // Устанавливаем статус из базы данных
    kycStatus.value = data.kyc_status || 'не начата';
    
    if (data.id_document_url) {
      documents.identity.url = data.id_document_url;
      documents.identity.status = 'success';
    }
    if (data.address_document_url) {
      documents.address.url = data.address_document_url;
      documents.address.status = 'success';
    }
  }
});

// Сброс статуса для повторной попытки (теперь тоже работает с базой данных)
async function resetStatus() {
  if (!userId.value) return;
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ kyc_status: 'не начата' })
      .eq('id', userId.value);

    if (error) throw error;

    kycStatus.value = 'не начата';
    Object.keys(documents).forEach(key => {
      documents[key].file = null;
      documents[key].status = 'empty';
      documents[key].progress = 0;
      documents[key].error = '';
    });
  } catch (err) {
    console.error("Ошибка при сбросе статуса в базе данных:", err);
  }
}

function handleFileChange(docType, event) {
  const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];
  if (!file) return;
  documents[docType].file = file;
  documents[docType].status = 'selected';
  documents[docType].error = '';
}

function removeFile(docType) {
  documents[docType].file = null;
  documents[docType].status = 'empty';
}

const isSubmitDisabled = computed(() => {
  return !documents.identity.file || !documents.address.file || isSubmitting.value;
});

async function submitDocuments() {
  isSubmitting.value = true;
  
  try {
    const uploads = Object.entries(documents)
      .filter(([, doc]) => doc.file && doc.status === 'selected')
      .map(async ([key, doc]) => {
        doc.status = 'uploading';
        const fileExt = doc.file.name.split('.').pop();
        const filePath = `${userId.value}/kyc/${key}_${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage.from('photo').upload(filePath, doc.file, {
          onProgress: ({ loaded, total }) => {
            doc.progress = Math.round((loaded / total) * 100);
          }
        });
        if (error) throw error;
        
        const { data: urlData } = supabase.storage.from('photo').getPublicUrl(filePath);
        doc.url = urlData.publicUrl;
        doc.status = 'success';
        
        return { key, url: doc.url };
      });

    const results = await Promise.all(uploads);
    
    // 2. Готовим объект для обновления профиля, включая статус
    const profileUpdate = {
      kyc_status: 'в обработке'
    };
    results.forEach(res => {
      if (res.key === 'identity') profileUpdate.id_document_url = res.url;
      if (res.key === 'address') profileUpdate.address_document_url = res.url;
    });

    // 3. Отправляем всё в базу данных
    const { error: updateError } = await supabase
      .from('profiles')
      .update(profileUpdate)
      .eq('id', userId.value);

    if (updateError) throw updateError;
    
    // Обновляем статус локально для немедленного отображения
    kycStatus.value = 'в обработке';

  } catch (error) {
    console.error('Ошибка при отправке документов:', error);
    Object.values(documents).forEach(doc => {
      if (doc.status === 'uploading') {
        doc.status = 'error';
        doc.error = error.message;
      }
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="kyc-container">
    <div class="kyc-header">
      <h1>Верификация (KYC)</h1>
      <p>Для безопасности вашего аккаунта и доступа ко всем функциям, пожалуйста, подтвердите вашу личность.</p>
    </div>

    <div v-if="kycStatus === 'в обработке'" class="status-card pending">
      <h2>⏳ В обработке</h2>
      <p>Ваши документы были успешно загружены и сейчас находятся на проверке. Обычно это занимает до 24 часов. Мы сообщим вам о результатах по email.</p>
    </div>

    <div v-else-if="kycStatus === 'одобрена'" class="status-card approved">
      <h2>✅ Одобрена</h2>
      <p>Поздравляем! Ваш аккаунт успешно верифицирован. Вам доступны все функции платформы.</p>
    </div>
    
    <div v-else-if="kycStatus === 'отклонена'" class="status-card rejected">
      <h2>❌ Отклонена</h2>
      <p>К сожалению, ваши документы не прошли проверку. Пожалуйста, проверьте ваш email на наличие подробной информации и попробуйте загрузить документы снова.</p>
      <button @click="resetStatus" class="retry-button">Попробовать снова</button>
    </div>

    <div v-else class="upload-form">
      <div class="documents-grid">
        <div v-for="(doc, key) in documents" :key="key" class="uploader-wrapper">
          <h4>{{ doc.title }}</h4>
          <p class="uploader-description">{{ doc.description }}</p>

          <div v-if="doc.status === 'uploading'" class="upload-progress">
            <div class="file-info">
              <span class="file-name">{{ doc.file.name }}</span>
              <span class="progress-percent">{{ doc.progress }}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: doc.progress + '%' }"></div>
            </div>
          </div>
          
          <div v-else-if="doc.status === 'success'" class="upload-success">
             ✅ Документ уже загружен.
          </div>

          <div v-else-if="doc.status === 'error'" class="upload-error">
             <p>❌ Ошибка: {{ doc.error }}</p>
             <button @click="removeFile(key)" class="retry-button small">Попробовать снова</button>
          </div>

          <div v-else 
            class="drop-area"
            @dragover.prevent
            @drop.prevent="handleFileChange(key, $event)"
          >
            <input :id="'fileInput-' + key" type="file" @change="handleFileChange(key, $event)" class="file-input">
            <label :for="'fileInput-' + key" class="drop-label">
              <template v-if="doc.file">
                <div class="selected-file-info">
                  <span>📄 {{ doc.file.name }}</span>
                  <button @click.prevent="removeFile(key)" class="remove-file-btn">×</button>
                </div>
              </template>
              <template v-else>
                <span>Перетащите файл или <strong>нажмите для выбора</strong></span>
              </template>
            </label>
          </div>
        </div>
      </div>
      
      <button @click="submitDocuments" :disabled="isSubmitDisabled" class="submit-button">
        <span v-if="isSubmitting">Отправка...</span>
        <span v-else>Отправить на верификацию</span>
      </button>
    </div>
  </div>
</template>


<style scoped>
/* Стили не менялись */
.kyc-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background: #14161b;
  border-radius: 12px;
  color: #f1f5f9;
}
.kyc-header {
  text-align: center;
  margin-bottom: 32px;
}
.kyc-header h1 {
  margin-bottom: 8px;
}
.kyc-header p {
  color: #94a3b8;
  font-size: 1.1rem;
}
.status-card {
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
}
.status-card.pending {
  background-color: rgba(255, 179, 0, 0.05);
  border-color: rgba(255, 179, 0, 0.3);
}
.status-card.approved {
  background-color: rgba(22, 163, 74, 0.05);
  border-color: rgba(22, 163, 74, 0.3);
}
.status-card.rejected {
  background-color: rgba(220, 38, 38, 0.05);
  border-color: rgba(220, 38, 38, 0.3);
}
.status-card h2 {
  margin-top: 0;
  margin-bottom: 12px;
}
.status-card p {
  margin-bottom: 0;
  color: #cbd5e1;
  line-height: 1.6;
}
.documents-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;
}
@media (min-width: 768px) {
  .documents-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.uploader-wrapper h4 {
  margin-top: 0;
  margin-bottom: 8px;
}
.uploader-description {
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 0;
  margin-bottom: 16px;
  min-height: 54px;
}
.drop-area {
  border: 2px dashed #2a2f3a;
  border-radius: 8px;
  padding: 4px;
  transition: border-color 0.2s;
  height: 120px;
}
.drop-area:hover {
  border-color: #ff4d00;
}
.file-input {
  display: none;
}
.drop-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  color: #94a3b8;
}
.drop-label strong {
  color: #ff4d00;
}
.selected-file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  background: #1e232d;
  padding: 8px 12px;
  border-radius: 6px;
  color: #f1f5f9;
}
.remove-file-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 4px;
}
.upload-progress {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 8px;
}
.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: #2a2f3a;
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background-color: #ff4d00;
  border-radius: 4px;
  transition: width 0.2s linear;
}
.upload-success, .upload-error {
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
}
.upload-success {
  background: rgba(22, 163, 74, 0.1);
  border: 1px solid rgba(22, 163, 74, 0.3);
}
.upload-error p {
  color: #ef4444;
  margin: 0 0 8px 0;
  font-size: 0.9rem;
}
.retry-button {
  background: #ff4d00;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 16px;
}
.retry-button.small {
  padding: 6px 12px;
  font-size: 0.9rem;
  margin-top: 0;
}
.submit-button {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  background: #ff4d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
}
.submit-button:disabled {
  background-color: #2a2f3a;
  color: #94a3b8;
  cursor: not-allowed;
}
</style>