<script setup>
import { reactive, ref, onMounted, watch, computed, nextTick } from 'vue' // <-- 1. Додано nextTick
import { supabase } from '../../supabaseClient'
import { Country, State, City } from 'country-state-city'

const form = reactive({
  lastName: '', firstName: '', middleName: '', birthDate: '', taxId: '',
  country: '', region: '', city: '', address: '', postalCode: '',
  email: '', phone: '', password: '', avatar_url: null
})

const message = ref('')
const avatar = ref('')
const userId = ref(null)
const countries = ref([])
const regions = ref([])
const cities = ref([])
const isUploading = ref(false)
const uploadProgress = ref(0)
let progressInterval = null;

const emailInitial = computed(() => (form.email ? form.email.charAt(0).toUpperCase() : '?'));
const avatarFallbackStyle = computed(() => {
  if (!form.email) return { backgroundColor: '#888' };
  const hashCode = form.email.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const colors = ['#ff4d00', '#ff9a00', '#1e232d', '#2a2f3a', '#0b0c10'];
  const index = Math.abs(hashCode % colors.length);
  return { backgroundColor: colors[index] };
});

onMounted(async () => {
  countries.value = Country.getAllCountries().map(c => ({
    name: c.name, isoCode: c.isoCode, phonecode: c.phonecode
  }));
  
  const savedUserId = localStorage.getItem('user-id');
  if (savedUserId) {
    userId.value = savedUserId;
    await loadProfile(savedUserId);
  } else {
    message.value = "Профиль не найден. Пожалуйста, зарегистрируйтесь.";
  }
});

watch(() => form.country, (newCountryIso, oldCountryIso) => {
  // Заповнюємо регіони, тільки якщо країна дійсно змінилася користувачем
  if (newCountryIso !== oldCountryIso) {
    form.region = '';
    form.city = '';
  }
  regions.value = newCountryIso ? State.getStatesOfCountry(newCountryIso).map(s => ({ name: s.name, isoCode: s.isoCode })) : [];
});

watch(() => form.region, (newRegionIso, oldRegionIso) => {
  // Заповнюємо міста, тільки якщо регіон дійсно змінився користувачем
  if (newRegionIso !== oldRegionIso) {
    form.city = '';
  }
  cities.value = (form.country && newRegionIso) ? City.getCitiesOfState(form.country, newRegionIso) : [];
});

// --- ✅ ОСНОВНЕ ВИПРАВЛЕННЯ ТУТ ---
async function loadProfile(id) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error || !data) throw error || new Error("Profile not found");

    // Спочатку присвоюємо всі дані, ОКРІМ залежних полів
    const { country, region, city, ...restOfData } = data;
    Object.assign(form, restOfData);
    avatar.value = data.avatar_url || '';

    // Тепер послідовно встановлюємо залежні поля, чекаючи на оновлення DOM
    if (country) {
      form.country = country;
      await nextTick(); // Чекаємо, доки watch для країни відпрацює і заповнить список регіонів
      
      if (region) {
        form.region = region;
        await nextTick(); // Чекаємо, доки watch для регіону відпрацює і заповнить список міст
        
        if (city) {
          form.city = city;
        }
      }
    }
  } catch (err) {
    message.value = 'Ошибка загрузки данных.';
    console.error(err);
  }
}

async function save() {
  if (!userId.value) return;
  
  const dataToUpdate = { ...form };
  if (!dataToUpdate.password) delete dataToUpdate.password;

  try {
    const { error } = await supabase.from('profiles').update(dataToUpdate).eq('id', userId.value);
    if (error) throw error;
    message.value = 'Данные успешно обновлены!';
    form.password = '';
  } catch (err) {
    message.value = 'Ошибка сохранения данных.';
    console.error(err);
  }
}

function startFakeProgress() {
    uploadProgress.value = 0;
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (uploadProgress.value < 95) {
            uploadProgress.value += 5;
        } else {
            clearInterval(progressInterval);
        }
    }, 100);
}

async function onAvatarChange(e) {
  const file = e.target.files[0];
  if (!file || !userId.value) return;

  isUploading.value = true;
  message.value = 'Загрузка фото...';
  startFakeProgress();
  
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId.value}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('photo').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('photo').getPublicUrl(filePath);
    if (!data.publicUrl) {
      throw new Error("Не удалось сгенерировать публичный URL для фото.");
    }
    
    const { error: rpcError } = await supabase.rpc('update_avatar_url', {
      new_avatar_url: data.publicUrl
    });

    if (rpcError) throw rpcError;
    
    // Если всё успешно, обновляем интерфейс И ДАННЫЕ ФОРМЫ
    clearInterval(progressInterval);
    uploadProgress.value = 100;

    avatar.value = data.publicUrl; // Эта строка обновляет картинку
    form.avatar_url = data.publicUrl; // ✅ ДОБАВЬТЕ ЭТУ СТРОКУ! Она обновляет данные в форме.

    message.value = 'Фото успешно загружено!';

  } catch (err) {
    message.value = `Ошибка загрузки фото: ${err.message}`;
    console.error('Детальная ошибка:', err);
    clearInterval(progressInterval);
  } finally {
    setTimeout(() => {
        isUploading.value = false;
    }, 2000);
  }
}
</script>

<template>
  <form class="personal-form" @submit.prevent="save">
    <div class="avatar-upload">
      
      <div v-if="isUploading" class="progress-container">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <span>{{ uploadProgress }}%</span>
      </div>

      <template v-else>
        <img v-if="avatar" :src="avatar" alt="Аватар" class="avatar" />
        <div v-else class="avatar avatar-fallback" :style="avatarFallbackStyle">
          <span>{{ emailInitial }}</span>
        </div>
        <label class="upload-label">
          Загрузить фото профиля
          <input type="file" accept="image/*" @change="onAvatarChange" />
        </label>
      </template>

    </div>

    <h2>Личная информация</h2>
    <div class="grid">
        <label>Фамилия<input v-model="form.lastName" /></label>
        <label>Имя<input v-model="form.firstName" /></label>
        <label>Отчество<input v-model="form.middleName" /></label>
        <label>Дата рождения<input v-model="form.birthDate" type="date" /></label>
        <label>ИНН<input v-model="form.taxId" /></label>
    </div>

    <h2>Адрес проживания</h2>
    <div class="grid">
      <label>Страна
        <select v-model="form.country">
          <option value="">Выберите страну</option>
          <option v-for="country in countries" :key="country.isoCode" :value="country.isoCode">{{ country.name }}</option>
        </select>
      </label>
      <label>Регион
        <select v-model="form.region" :disabled="!form.country">
          <option value="">Выберите регион</option>
          <option v-for="region in regions" :key="region.isoCode" :value="region.isoCode">{{ region.name }}</option>
        </select>
      </label>
      <label>Город
        <select v-model="form.city" :disabled="!form.region">
          <option value="">Выберите город</option>
          <option v-for="city in cities" :key="city.name" :value="city.name">{{ city.name }}</option>
        </select>
      </label>
      <label>Адрес<input v-model="form.address" /></label>
      <label>Почтовый индекс<input v-model="form.postalCode" /></label>
    </div>

    <h2>Контакты</h2>
    <div class="grid">
      <label>E-mail<input v-model="form.email" type="email" /></label>
      <label>Телефон<input v-model="form.phone" /></label>
    </div>
    
    <button type="submit">Сохранить</button>
    <p v-if="message && !isUploading" class="message">{{ message }}</p>
  </form>
</template>

<style scoped>
.personal-form {
  background: #14161b;
  padding: 24px;
  border-radius: 12px;
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  color: #f1f5f9;
}
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  min-height: 180px;
  justify-content: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}
.avatar-fallback { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}
.avatar-fallback span { 
  font-size: 56px; 
  font-weight: bold; 
  color: white; 
}
.upload-label { 
  cursor: pointer; 
  display: inline-block; 
  padding: 8px 16px; 
  border-radius: 8px; 
  background: #1e232d;
  transition: background-color 0.2s;
}
.upload-label:hover {
    background-color: #2a2f3a;
}
.upload-label input { display: none; }
.progress-container {
    width: 100%;
    max-width: 300px;
    text-align: center;
}
.progress-bar-container {
    width: 100%;
    background-color: #2a2f3a;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
}
.progress-bar {
    height: 10px;
    background-color: #ff4d00;
    width: 0%;
    border-radius: 10px;
    transition: width 0.1s linear;
}
.progress-container span {
    color: #94a3b8;
    font-size: 14px;
}
h2 {
    margin-top: 24px;
    margin-bottom: 16px;
    border-bottom: 1px solid #2a2f3a;
    padding-bottom: 8px;
}
.grid { 
  display: grid; 
  gap: 16px; 
  margin-bottom: 24px; 
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
}
label { 
  display: flex; 
  flex-direction: column; 
  font-size: 14px; 
  gap: 8px; 
}
input, select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
  font-size: 1rem;
}
input:focus, select:focus {
    outline: none;
    border-color: #ff4d00;
}
button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}
button:hover {
    background-color: #e64400;
}
.message { 
  margin-top: 16px; 
  color: #ff9a00; 
  text-align: center; 
  min-height: 20px;
}
@media (max-width: 768px) {
    .personal-form {
        margin: 20px;
        padding: 16px;
    }
}
@media (max-width: 480px) {
    .grid {
        grid-template-columns: 1fr;
    }
    .personal-form {
        margin: 10px;
        padding: 12px;
    }
    h2 {
        font-size: 1.25rem;
    }
}
</style>