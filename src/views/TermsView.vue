<template>
  <div class="terms-container">
    <iframe class="terms-frame" src="/terms.html"></iframe>
  </div>
</template>

<style scoped>
.terms-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.terms-frame {
  width: 100%;
  border: none;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .terms-container {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .terms-container {
    padding: 12px;
  }
}
</style>
