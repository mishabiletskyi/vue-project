<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Поддержка</h1>
        <p>Мы всегда готовы помочь вам.</p>
      </div>
      <div class="support-content">
        <p>Здесь появится информация о службе поддержки.</p>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.support-content {
  background-color: var(--card);
  padding: 24px;
  border-radius: var(--radius);
}
@media (max-width: 768px) {
  .page-header h1 { font-size: 2rem; }
}
</style>
