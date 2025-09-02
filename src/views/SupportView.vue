<script setup>
import { ref } from 'vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';

// Стан для керування акордеоном FAQ
const openFaq = ref(null);

const toggleFaq = (index) => {
  if (openFaq.value === index) {
    openFaq.value = null; // Закриваємо, якщо клікнули повторно
  } else {
    openFaq.value = index; // Відкриваємо новий
  }
};

// Функція для відкриття чату Intercom
const openLiveChat = () => {
  if (window.Intercom) {
    window.Intercom('show');
  } else {
    console.warn('Intercom script not found.');
  }
};

const faqs = [
  {
    category: 'Аккаунт и Верификация',
    items: [
      { q: 'Зачем нужна верификация (KYC)?', a: 'Верификация (Know Your Customer) — это обязательная процедура для подтверждения вашей личности. Она необходима для обеспечения безопасности вашего аккаунта, предотвращения мошенничества и соблюдения законодательных требований. Без верификации вы не сможете выводить средства.' },
      { q: 'Какие документы нужны для верификации?', a: 'Обычно мы запрашиваем цветное фото или скан документа, удостоверяющего личность (паспорт, ID-карта, водительское удостоверение), а также документ, подтверждающий адрес проживания (например, счет за коммунальные услуги не старше 3 месяцев).' },
      { q: 'Я забыл свой пароль. Что делать?', a: 'На странице входа нажмите на ссылку "Забыли пароль?". Введите свой email, и мы отправим вам инструкцию по восстановлению доступа.' }
    ]
  },
  {
    category: 'Депозиты и Выплаты',
    items: [
      { q: 'Какие способы пополнения доступны?', a: 'Мы поддерживаем различные способы пополнения, включая банковские карты (Visa, Mastercard), электронные кошельки и криптовалюты. Полный список доступен в разделе "Касса" после входа в аккаунт.' },
      { q: 'Как быстро обрабатываются заявки на вывод?', a: 'Заявки на вывод средств обрабатываются нашей финансовой службой в порядке очереди. Обычно это занимает от нескольких минут до 24 часов. Скорость зачисления на ваш счет после обработки зависит от выбранного платежного метода.' },
      // 👇 ЗМІНЕНО ТЕКСТ ПРО КОМІСІЮ
      { q: 'Есть ли комиссия на депозиты и выводы?', a: 'Мы взимаем небольшую комиссию в размере 1.5% при каждом пополнении счета для покрытия расходов платежных систем. Комиссия за вывод средств с нашей стороны полностью отсутствует.' }
    ]
  },
  {
    category: 'Бонусы и Акции',
    items: [
      { q: 'Что такое вейджер (wager)?', a: 'Вейджер — это множитель, который показывает, какую сумму ставок необходимо сделать, чтобы отыграть бонус. Например, если вы получили бонус 1000 ₽ с вейджером x30, вам нужно сделать ставок на общую сумму 30 000 ₽, прежде чем бонусные средства можно будет вывести.' },
      { q: 'Где я могу увидеть доступные мне бонусы?', a: 'Все доступные вам персональные предложения, бонусы и акции находятся в разделе "Бонусы" вашего личного кабинета.' }
    ]
  },
    {
    category: 'Турниры',
    items: [
      { q: 'Как зарегистрироваться в турнире?', a: 'Перейдите на страницу "Турниры", выберите интересующее вас событие со статусом "Скоро" и нажмите кнопку "Регистрация". Если требуется верификация, пройдите ее согласно инструкциям в модальном окне.' },
      { q: 'Как распределяется призовой фонд?', a: 'Структура распределения призового фонда указана в лобби каждого турнира. Обычно призы получают топ 10-15% участников, при этом наибольшую выплату получает победитель.' }
    ]
  }
];

</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Центр Поддержки</h1>
        <p>Нужна помощь? Вы в правильном месте. Найдите ответы или свяжитесь с нами.</p>
      </div>
      
      <div class="support-content">
        
        <section class="contact-options">
          <div class="contact-card" @click="openLiveChat">
            <div class="icon">💬</div>
            <h3>Live Chat</h3>
            <p>Самый быстрый способ получить помощь. Среднее время ответа: 2 минуты.</p>
            <button class="cta-button">Начать чат</button>
          </div>
          <a href="mailto:support@example.com" class="contact-card">
            <div class="icon">📧</div>
            <h3>Email Поддержка</h3>
            <p>Для несрочных вопросов или если нужно отправить документы.</p>
            <button class="cta-button">Написать на почту</button>
          </a>
        </section>
        
        <div class="divider"></div>
        
        <section class="faq-section">
          <h2>Часто задаваемые вопросы (FAQ)</h2>
          <div v-for="(category, catIndex) in faqs" :key="catIndex" class="faq-category">
            <h3>{{ category.category }}</h3>
            <div class="faq-list">
              <div v-for="(item, itemIndex) in category.items" :key="itemIndex" class="faq-item">
                <button class="faq-question" @click="toggleFaq(catIndex + '-' + itemIndex)">
                  <span>{{ item.q }}</span>
                  <span :class="['arrow', { 'open': openFaq === catIndex + '-' + itemIndex }]">›</span>
                </button>
                <div v-if="openFaq === catIndex + '-' + itemIndex" class="faq-answer">
                  <p>{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div class="divider"></div>

        <section class="responsible-gaming">
            <h2>Ответственная игра</h2>
            <p>Мы поддерживаем принципы ответственной игры. Азартные игры должны быть развлечением, а не способом заработка. Если вы чувствуете, что теряете контроль, пожалуйста, воспользуйтесь инструментами самоограничения в вашем профиле или свяжитесь с нашей службой поддержки для консультации.</p>
        </section>

      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 32px;
}
.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: #fff;
}
/* 👇 ЗМІНЕНО: текст тепер не переноситься на десктопі */
.page-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 auto;
  white-space: nowrap; 
}

.support-content {
  background-color: var(--card);
  padding: 32px;
  border-radius: var(--radius);
  border: 1px solid #2a2f3a;
}

/* --- Contact Options --- */
.contact-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}
.contact-card {
  background-color: #1e232d;
  padding: 24px;
  border-radius: var(--radius);
  text-align: center;
  border: 1px solid #2a2f3a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: var(--accent);
}
.contact-card .icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}
.contact-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  color: #fff;
}
.contact-card p {
  margin: 0 0 20px 0;
  color: var(--text-secondary);
  flex-grow: 1;
}
.cta-button {
  width: 100%;
  padding: 12px;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
}
.contact-card:hover .cta-button {
  background-color: #00aaff;
}

/* --- Divider --- */
.divider {
  height: 1px;
  background-color: #2a2f3a;
  margin: 40px 0;
}

/* --- FAQ Section --- */
.faq-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 32px;
}
.faq-category {
    margin-bottom: 24px;
}
.faq-category h3 {
    color: var(--accent);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #2a2f3a;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  background-color: #1e232d;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  overflow: hidden;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
}
.faq-question .arrow {
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s ease;
}
.faq-question .arrow.open {
  transform: rotate(90deg);
}

.faq-answer {
  padding: 0 20px 20px 20px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* --- Responsible Gaming --- */
.responsible-gaming {
    text-align: center;
    padding: 16px;
    background-color: rgba(255, 179, 0, 0.05);
    border: 1px solid rgba(255, 179, 0, 0.2);
    border-radius: var(--radius);
}
.responsible-gaming h2 {
    font-size: 1.5rem;
    color: #ffb300;
    margin-bottom: 8px;
}
.responsible-gaming p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
}


/* --- 👇 ПОКРАЩЕНА АДАПТИВНІСТЬ 👇 --- */

/* Планшети (Tablet) */
@media (max-width: 992px) {
  .support-content {
    padding: 24px;
  }
  .page-header p {
     white-space: normal; /* Дозволяємо перенос на планшетах */
  }
}

/* Мобільні пристрої (Mobile) */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  .page-header p {
    font-size: 1rem;
  }
  .support-content {
    padding: 16px;
  }
  .contact-options {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .contact-card p {
    min-height: unset; /* Скидаємо мін висоту на мобільних */
  }
  .faq-section h2 {
    font-size: 1.75rem;
    margin-bottom: 24px;
  }
  .faq-question {
    font-size: 1rem;
    padding: 14px 16px;
  }
  .faq-answer {
    padding: 0 16px 16px 16px;
    font-size: 0.95rem;
  }
  .divider {
    margin: 32px 0;
  }
}
</style>