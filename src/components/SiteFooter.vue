<template>
  <footer id="support" class="site-footer">
    <div class="container footer-grid">
      <nav aria-label="Навигация подвала">
        <h3 class="footer-title">Разделы</h3>
        <ul class="footer-links">
          <li><RouterLink to="/games">Игры</RouterLink></li>
          <li><RouterLink to="/bonuses">Бонусы</RouterLink></li>
          <li><RouterLink to="/tournaments">Турниры</RouterLink></li>
          <li><a href="#learn-more">О нас</a></li>
        </ul>
      </nav>
      <div>
        <h3 class="footer-title">Поддержка</h3>
        <ul class="footer-links">
          <li><RouterLink to="/support">Центр помощи</RouterLink></li>
          <li><RouterLink to="/terms">Правила и условия</RouterLink></li>
          <li><RouterLink to="/privacy">Политика конфиденциальности</RouterLink></li>
        </ul>
      </div>
      <div>
        <h3 class="footer-title">Контакты</h3>
        <ul class="footer-links">
            <li><a href="mailto:support@example.com" class="contact-link">support@example.com</a></li>
            <li><p class="copyright">© 2025 GG • Casino</p></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #14161b;
  color: #94a3b8;
  /* Зменшив вертикальні відступи */
  padding: 25px 20px; 
  border-top: 1px solid #2a2f3a;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  /* Зменшив відстань між колонками */
  gap: 20px; 
}

.footer-title {
  color: #f1f5f9;
  font-size: 1.1rem;
  /* Зменшив відступ під заголовком */
  margin-bottom: 12px; 
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  /* Зменшив відступ між пунктами меню */
  margin-bottom: 8px; 
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover, .contact-link:hover {
  color: #ff4d00;
}

.contact-link, .copyright {
    color: #94a3b8;
    text-decoration: none;
    margin: 0;
    line-height: 1.5;
}

/* --- Адаптація для планшетів та мобільних --- */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr; 
    text-align: center;
  }

  .footer-title {
      /* Зменшив відступ зверху для мобільної версії */
      margin-top: 15px; 
  }

  .footer-grid > *:first-child .footer-title {
      margin-top: 0;
  }
}
</style>