<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; // 👈 1. Імпортуємо роутер для перенаправлення
import { supabase } from '../supabaseClient'; // 👈 2. Імпортуємо клієнт Supabase
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';

const router = useRouter(); // Ініціалізуємо роутер

// --- ДАНІ ТА ГЕНЕРАЦІЯ ТУРНІРІВ (без змін) ---
const createDate = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date;
};
const statusTranslations = {
  live: 'В ЭФИРЕ',
  upcoming: 'СКОРО',
  finished: 'ЗАВЕРШЕН'
};
const generateTournaments = () => {
  let tournamentsList = [];
  const gameProfiles = [
    { game: 'Техасский Холдем(Покер)', nameTemplate: 'Ежедневный Турбо', entryFee: 5000, prizePool: 1_500_000, car: { name: 'Toyota Camry GR Sport', value: 4_500_000 }},
    { game: 'Блэкджек', nameTemplate: 'Блиц-турнир по Блэкджеку', entryFee: 7500, prizePool: 2_000_000, car: { name: 'Kia K5 GT Line', value: 3_000_000 } },
    { game: 'Техасский Холдем(Покер)', nameTemplate: 'Главное Событие', entryFee: 50000, prizePool: 15_000_000, car: { name: 'BMW X5 M Competition', value: 14_000_000 } },
    { game: 'Омаха Покер', nameTemplate: 'Кубок по Омахе', entryFee: 25000, prizePool: 7_000_000, car: { name: 'Genesis G80', value: 6_000_000 } },
    { game: 'Баккара', nameTemplate: 'VIP Baccarat Challenge', entryFee: 100000, prizePool: 25_000_000, car: { name: 'Mercedes-Benz S-Class', value: 22_000_000 } },
    { game: '5-карточный Дро-покер', nameTemplate: 'Классика Покера', entryFee: 20000, prizePool: 5_000_000, car: { name: 'Audi Q8', value: 9_000_000 } },
    { game: 'Рулетка', nameTemplate: 'Колесо Фортуны', entryFee: 15000, prizePool: 4_000_000, car: { name: 'Lexus RX 350', value: 7_000_000 } },
  ];
  const totalTournaments = 20;
  const lowStakesCount = Math.floor(totalTournaments / 3);
  for (let i = 0; i < totalTournaments; i++) {
    const profile = i < lowStakesCount
      ? gameProfiles[i % 2]
      : gameProfiles[2 + (i % (gameProfiles.length - 2))];
    const tournamentData = {
      id: `tourney-${i}`,
      name: `${profile.nameTemplate} #${i + 1}`,
      game: profile.game,
      prizePool: profile.prizePool,
      prizeAlternative: `или ${profile.car.name}`,
      entryFee: profile.entryFee,
      image: `https://picsum.photos/seed/${encodeURIComponent(profile.game)}-${i}/800/600`,
    };
    tournamentsList.push(tournamentData);
  }
  const liveCount = 12, finishedCount = 5;
  tournamentsList.forEach((tourney, i) => {
    if (i < liveCount) {
      Object.assign(tourney, { status: 'live', startDate: createDate(-2), endDate: createDate(5 + i), participants: Math.floor(Math.random() * 500) + 100 });
    } else if (i < liveCount + finishedCount) {
      Object.assign(tourney, { status: 'finished', startDate: createDate(-20 - i*2), endDate: createDate(-15 - i), participants: Math.floor(Math.random() * 1000) + 200 });
    } else {
      Object.assign(tourney, { status: 'upcoming', startDate: createDate(10 + i*2), endDate: createDate(15 + i*2), participants: 0 });
    }
  });
  tournamentsList.sort((a, b) => a.entryFee - b.entryFee);
  return tournamentsList;
};

// --- ОСНОВНИЙ СТАН КОМПОНЕНТА (з доповненнями) ---

const tournaments = ref(generateTournaments());
const searchQuery = ref('');
const activeFilter = ref('all');
const isModalVisible = ref(false);
const modalContent = ref({ type: '', data: null });

// 👇 3. Нові стани для багатоетапного модального вікна
const modalStep = ref('form'); // 'form', 'loading', 'deposit'
const userId = ref(null);
const registrationForm = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  document_url: ''
});
const documentFile = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');

// --- ФУНКЦІЇ ДЛЯ МОДАЛЬНИХ ВІКОН (оновлені та нові) ---

// Завантажуємо профіль користувача, щоб заповнити форму
async function loadProfile(id) {
  try {
    const { data, error } = await supabase.from('profiles').select('firstName, lastName, birthDate, email, phone').eq('id', id).single();
    if (error) throw error;
    if (data) {
      Object.assign(registrationForm, data);
    }
  } catch (err) {
    console.error('Ошибка загрузки профиля:', err);
    errorMessage.value = 'Не удалось загрузить данные вашего профиля.';
  }
}

// Функція, що викликається при кліку на "Регистрация"
const showUpcomingModal = async (tournament) => {
  errorMessage.value = '';
  documentFile.value = null; // Скидаємо файл
  modalStep.value = 'form'; // Починаємо з форми

  const savedUserId = localStorage.getItem('user-id');
  if (savedUserId) {
    userId.value = savedUserId;
    await loadProfile(savedUserId); // Завантажуємо дані для форми
  } else {
    // Якщо користувач не авторизований, можна показати помилку або редіректнути
    console.error("User ID not found");
    return;
  }
  
  modalContent.value = { 
    type: 'upcoming', 
    data: { 
      startDate: tournament.startDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) 
    }
  };
  isModalVisible.value = true;
};

// Обробка вибраного файлу
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    documentFile.value = file;
  }
};

// Головна функція: обробка відправки форми реєстрації
const handleRegistration = async () => {
  if (!userId.value || !documentFile.value) {
    errorMessage.value = 'Пожалуйста, заполните все поля и загрузите документ.';
    return;
  }

  modalStep.value = 'loading'; // Показуємо анімацію завантаження
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // 1. Завантажуємо документ у Storage
    const fileExt = documentFile.value.name.split('.').pop();
    const filePath = `documents/${userId.value}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('photo').upload(filePath, documentFile.value);
    if (uploadError) throw uploadError;

    // 2. Отримуємо публічний URL файлу
    const { data: urlData } = supabase.storage.from('photo').getPublicUrl(filePath);
    if (!urlData.publicUrl) throw new Error("Не удалось получить URL документа.");

    // 3. Оновлюємо профіль користувача в таблиці `profiles`
    const updates = {
      ...registrationForm,
      document_url: urlData.publicUrl, // Зберігаємо посилання на документ
      updated_at: new Date(),
    };
    
    const { error: updateError } = await supabase.from('profiles').update(updates).eq('id', userId.value);
    if (updateError) throw updateError;
    
    // Успіх! Переходимо до наступного кроку
    modalStep.value = 'deposit';

  } catch (err) {
    console.error('Ошибка регистрации:', err);
    errorMessage.value = `Произошла ошибка: ${err.message}`;
    modalStep.value = 'form'; // Повертаємо на форму в разі помилки
  } finally {
    isLoading.value = false;
  }
};

// Перенаправлення на сторінку поповнення
const redirectToDeposit = () => {
  closeModal();
  router.push('/deposit');
};


const showResultsModal = (tournament) => {
  const winners = []; const prizeDistribution = [0.5, 0.25, 0.1, 0.05, 0.05];
  const nicknames = ['MadMax', 'PokerShark', 'LadyLuck', 'AceKing', 'RoyalFlush', 'TheGambler'];
  for(let i = 0; i < 5; i++) {
    winners.push({ place: i + 1, nickname: nicknames[Math.floor(Math.random() * nicknames.length)] + (Math.floor(Math.random() * 100)), payout: formatCurrency(tournament.prizePool * prizeDistribution[i]) });
  }
  modalContent.value = { type: 'results', data: { name: tournament.name, participants: tournament.participants, winners: winners }};
  isModalVisible.value = true;
};
const closeModal = () => { isModalVisible.value = false; };

// --- РЕШТА ЛОГІКИ (без змін) ---
const getTournamentStatus = (startDate, endDate) => {
  const now = new Date(); if (now < startDate) return 'upcoming'; if (now >= startDate && now <= endDate) return 'live'; return 'finished';
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};
const processedTournaments = computed(() => {
  return tournaments.value.map(t => ({ ...t, status: getTournamentStatus(t.startDate, t.endDate), formattedPrize: formatCurrency(t.prizePool), formattedEntry: formatCurrency(t.entryFee) }));
});
const filteredTournaments = computed(() => {
  return processedTournaments.value.filter(t => (t.name.toLowerCase().includes(searchQuery.value.toLowerCase())) && (activeFilter.value === 'all' || t.status === activeFilter.value));
});
const participantCount = ref(1000);
let intervalId;
onMounted(() => { intervalId = setInterval(() => { participantCount.value += [1, 5, 4, 8, 9][Math.floor(Math.random() * 5)]; }, 1000); });
onUnmounted(() => { clearInterval(intervalId); });
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Турниры</h1>
        <p>Крупнейшие игровые события с огромными призами.</p>
      </div>
      
      <div class="filter-tabs">
        <button @click="activeFilter = 'all'" :class="{ active: activeFilter === 'all' }">Все</button>
        <button @click="activeFilter = 'live'" :class="{ active: activeFilter === 'live' }">🔥 В эфире</button>
        <button @click="activeFilter = 'upcoming'" :class="{ active: activeFilter === 'upcoming' }">🚀 Будущие</button>
        <button @click="activeFilter = 'finished'" :class="{ active: activeFilter === 'finished' }">🏁 Завершенные</button>
      </div>
      
      <div class="tournament-grid">
        <div v-for="t in filteredTournaments" :key="t.id" :class="['tournament-card', t.status]">
          <div class="card-header">
            <img :src="t.image" :alt="t.name" class="card-bg-image" />
            <div class="card-overlay"></div>
            <span :class="['status-badge', t.status]">{{ statusTranslations[t.status] }}</span>
            <h3 class="card-title">{{ t.name }}</h3>
          </div>
          <div class="card-body">
            <div class="info-row prize">
              <div class="prize-wrapper">
                <strong>{{ t.formattedPrize }}</strong>
                <span class="prize-alt">{{ t.prizeAlternative }}</span>
              </div>
            </div>
            <div class="info-row"><span>Игра</span><span>{{ t.game }}</span></div>
            <div class="info-row"><span>Вход</span><span>{{ t.formattedEntry }}</span></div>
          </div>
          <div class="card-footer">
            <a v-if="t.status === 'live'" href="/deposit" class="cta-link"><button class="cta-button primary">Играть</button></a>
            <button v-if="t.status === 'upcoming'" @click="showUpcomingModal(t)" class="cta-button secondary">Регистрация</button>
            <button v-if="t.status === 'finished'" @click="showResultsModal(t)" class="cta-button disabled">Результаты</button>
          </div>
        </div>
      </div>
      <div v-if="filteredTournaments.length === 0" class="no-results">
        <h3>Турниры не найдены</h3>
        <p>Попробуйте изменить фильтры или поисковый запрос.</p>
      </div>
    </div>
    <RightSidebar />

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">&times;</button>
        
        <div v-if="modalContent.type === 'upcoming' && modalStep === 'form'">
          <h2>Регистрация на турнир</h2>
          <p class="modal-text">Турнир начнется: <span class="modal-highlight-text-inline">{{ modalContent.data.startDate }}</span></p>

          <div class="instructions">
            <h4>Подтверждение личности (KYC)</h4>
            <p>Для участия в турнирах с денежными призами нам необходимо верифицировать вашу личность. Это требование законодательства для предотвращения мошенничества. Ваши данные надежно защищены.</p>
          </div>
          
          <form @submit.prevent="handleRegistration" class="registration-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="firstName">Имя</label>
                <input type="text" id="firstName" v-model="registrationForm.firstName" required>
              </div>
              <div class="form-group">
                <label for="lastName">Фамилия</label>
                <input type="text" id="lastName" v-model="registrationForm.lastName" required>
              </div>
            </div>
            <div class="form-group">
              <label for="birthDate">Дата рождения</label>
              <input type="date" id="birthDate" v-model="registrationForm.birthDate" required>
            </div>
            <div class="form-grid">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="registrationForm.email" required>
              </div>
              <div class="form-group">
                <label for="phone">Номер телефона</label>
                <input type="tel" id="phone" v-model="registrationForm.phone" required>
              </div>
            </div>
            <div class="form-group">
              <label for="document">Документ (паспорт или ID-карта)</label>
              <label class="file-upload-label">
                 {{ documentFile ? documentFile.name : 'Выберите файл' }}
                 <input type="file" id="document" @change="handleFileChange" accept="image/png, image/jpeg, application/pdf" required>
              </label>
            </div>
             <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <button type="submit" class="cta-button primary submit-btn">Зарегистрироваться</button>
          </form>
        </div>

        <div v-if="modalContent.type === 'upcoming' && modalStep === 'loading'" class="modal-state-centered">
          <div class="loader"></div>
          <h2>Сохраняем данные...</h2>
          <p class="modal-text">Пожалуйста, подождите, мы верифицируем и сохраняем вашу информацию.</p>
        </div>

        <div v-if="modalContent.type === 'upcoming' && modalStep === 'deposit'" class="modal-state-centered">
          <h2>✅ Регистрация почти завершена!</h2>
          <p class="modal-text">Чтобы завершить регистрацию и занять место в турнире, необходимо пополнить баланс на сумму входа.</p>
          <p class="modal-text">Пополните баланс и вернитесь на страницу турниров.</p>
          <button @click="redirectToDeposit" class="cta-button primary submit-btn">Пополнить баланс</button>
        </div>
        
        <div v-if="modalContent.type === 'results'">
          <h2>Результаты турнира</h2>
          <h3 class="results-title">{{ modalContent.data.name }}</h3>
          <p class="results-participants">Участников: {{ modalContent.data.participants.toLocaleString('ru-RU') }}</p>
          <table class="results-table">
            <thead><tr><th>Место</th><th>Никнейм</th><th>Выплата</th></tr></thead>
            <tbody>
              <tr v-for="winner in modalContent.data.winners" :key="winner.place">
                <td>{{ winner.place }}</td><td>{{ winner.nickname }}</td><td>{{ winner.payout }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Усі ваші стилі залишаються тут --- */
.page-header { text-align: center; margin-bottom: 24px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; color: #fff; }
.page-header p { font-size: 1rem; color: var(--text-secondary); white-space: nowrap; }
:root { --primary-glow: rgba(0, 191, 255, 0.5); --green-glow: rgba(14, 204, 133, 0.7); --blue-glow: rgba(0, 123, 255, 0.7); --gray-glow: rgba(108, 117, 125, 0.7); }
.main-content { width: 100%; }
.header-info { display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin-top: 24px; }
.search-bar { position: relative; display: flex; align-items: center; width: 100%; max-width: 400px; }
.search-bar svg { position: absolute; left: 16px; color: var(--text-secondary); }
.search-bar input { width: 100%; padding: 12px 16px 12px 48px; background-color: var(--card); border: 1px solid #2a2f3a; border-radius: 8px; color: var(--text); font-size: 1rem; transition: all 0.2s ease-in-out; }
.search-bar input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 15px var(--primary-glow); }
.counter { display: flex; flex-direction: column; align-items: center; background-color: var(--card); padding: 8px 20px; border-radius: var(--radius); border: 1px solid #2a2f3a; }
.counter span { font-size: 0.8rem; color: var(--text-secondary); }
.counter strong { font-size: 1.25rem; color: var(--accent); font-weight: 700; }
.filter-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
.filter-tabs button { padding: 10px 20px; font-size: 0.9rem; font-weight: 600; background-color: transparent; color: var(--text-secondary); border: 1px solid #2a2f3a; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
.filter-tabs button.active { color: #fff; background-color: var(--accent); border-color: var(--accent); box-shadow: 0 0 10px var(--primary-glow); }
.filter-tabs button:hover:not(.active) { background-color: var(--card); color: var(--text); }
.tournament-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.tournament-card { background-color: var(--card); border-radius: var(--radius); overflow: hidden; border: 1px solid #2a2f3a; display: flex; flex-direction: column; transition: transform 0.3s, box-shadow 0.3s; }
.tournament-card:hover { transform: translateY(-5px); }
.tournament-card.live:hover { box-shadow: 0 0 20px var(--green-glow); }
.tournament-card.upcoming:hover { box-shadow: 0 0 20px var(--blue-glow); }
.card-header { position: relative; height: 150px; color: white; display: flex; flex-direction: column; justify-content: flex-end; padding: 16px; }
.card-bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; filter: brightness(0.9); }
.card-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)); z-index: 1; }
.card-title { position: relative; z-index: 2; font-size: 1.2rem; margin: 0; text-shadow: 1px 1px 3px rgba(0,0,0,0.7); line-height: 1.3; }
.status-badge { position: absolute; top: 16px; left: 16px; z-index: 2; padding: 4px 10px; font-size: 0.8rem; font-weight: 700; border-radius: 12px; color: #fff; }
.status-badge.live { background-color: #0ecc85; } .status-badge.upcoming { background-color: #007bff; } .status-badge.finished { background-color: #6c757d; }
.card-body { padding: 16px; flex-grow: 1; }
.info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.95rem; }
.info-row span:first-child { color: var(--text-secondary); }
.info-row.prize { padding: 12px; background-color: rgba(0, 191, 255, 0.05); border-radius: 8px; margin-bottom: 16px; text-align: center; display: block; }
.prize-wrapper { display: flex; flex-direction: column; align-items: center; }
.prize-wrapper strong { font-size: 1.7rem; font-weight: 700; color: var(--accent); line-height: 1.2; }
.prize-alt { font-size: 0.9rem; font-weight: 500; color: var(--text-secondary); }
.card-footer { padding: 0 16px 16px; }
.cta-link { text-decoration: none; display: block; }
.cta-button { width: 100%; padding: 14px; font-size: 1rem; font-weight: 700; border-radius: 8px; border: none; cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
.cta-button.primary { background-color: var(--accent); color: #fff; } .cta-button.primary:hover { background-color: #00aaff; box-shadow: 0 0 15px var(--primary-glow); }
.cta-button.secondary { background-color: transparent; color: var(--accent); border: 2px solid var(--accent); } .cta-button.secondary:hover { background-color: var(--accent); color: #fff; }
.cta-button.disabled { background-color: #3f4654; color: var(--text-secondary); } .cta-button.disabled:hover { background-color: #4a5162; }
.no-results { text-align: center; padding: 40px; background-color: var(--card); border-radius: var(--radius); border: 1px solid #2a2f3a; margin-top: 24px; }
.no-results h3 { font-size: 1.5rem; margin-bottom: 8px; } .no-results p { color: var(--text-secondary); }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: var(--card); padding: 24px 32px; border-radius: var(--radius); border: 1px solid #2a2f3a; width: 100%; max-width: 550px; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.modal-close-btn { position: absolute; top: 10px; right: 15px; background: none; border: none; color: var(--text-secondary); font-size: 2rem; cursor: pointer; line-height: 1; }
.modal-content h2 { font-size: 1.8rem; margin-top: 0; margin-bottom: 16px; text-align: center; }
.modal-text { font-size: 1.1rem; color: var(--text-secondary); text-align: center; margin-bottom: 8px; }
.modal-highlight-text { font-size: 1.5rem; color: var(--accent); font-weight: 700; text-align: center; margin: 16px 0; padding: 12px; background-color: rgba(0, 191, 255, 0.05); border-radius: 8px; }
.results-title { font-size: 1.2rem; color: var(--text-secondary); text-align: center; margin-bottom: 4px; font-weight: 500; }
.results-participants { font-size: 1rem; text-align: center; margin-bottom: 24px; }
.results-table { width: 100%; border-collapse: collapse; }
.results-table th, .results-table td { padding: 12px; text-align: left; border-bottom: 1px solid #2a2f3a; }
.results-table th { color: var(--text-secondary); font-size: 0.9rem; }
.results-table td:first-child { font-weight: 700; color: var(--accent); }
.results-table tr:last-child td { border-bottom: none; }


/* --- 👇 НОВІ СТИЛІ ДЛЯ ФОРМИ І СТАНІВ МОДАЛЬНОГО ВІКНА 👇 --- */
.modal-highlight-text-inline {
  color: var(--accent);
  font-weight: 600;
}

.instructions {
  background-color: rgba(0, 191, 255, 0.05);
  border-left: 3px solid var(--accent);
  padding: 12px 16px;
  border-radius: 4px;
  margin: 20px 0;
  font-size: 0.9rem;
}
.instructions h4 {
  margin: 0 0 8px 0;
  color: #fff;
}
.instructions p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.form-group input {
  padding: 12px;
  background-color: #0b0c10;
  border: 1px solid #2a2f3a;
  border-radius: 8px;
  color: var(--text);
  font-size: 1rem;
}
.form-group input:focus {
  outline: none;
  border-color: var(--accent);
}

.file-upload-label {
  display: block;
  padding: 12px;
  background-color: #0b0c10;
  border: 1px dashed #3f4654;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
}
.file-upload-label:hover {
  border-color: var(--accent);
  color: var(--text);
}
.file-upload-label input {
  display: none;
}
.submit-btn {
  margin-top: 16px;
}
.error-message {
  color: #ff4d4d;
  text-align: center;
  font-size: 0.9rem;
  margin-top: -8px;
  margin-bottom: 8px;
}

.modal-state-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
}
.loader {
  border: 4px solid #3f4654;
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 540px) {
  .page-header p { white-space: normal; }
  .modal-content { max-width: 90%; padding: 20px; }
  .modal-content h2 { font-size: 1.5rem; }
  .form-grid { grid-template-columns: 1fr; }
}
</style>