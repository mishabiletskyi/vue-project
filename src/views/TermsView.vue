<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const frameRef = ref(null);

function resizeFrame() {
  const iframe = frameRef.value;
  if (!iframe) return;
  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (doc) {
    iframe.style.height = doc.body.scrollHeight + 'px';
  }
}

onMounted(() => {
  window.addEventListener('resize', resizeFrame);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeFrame);
});
</script>

<template>
  <div class="terms-container">
    <iframe ref="frameRef" class="terms-frame" src="/terms.html" @load="resizeFrame"></iframe>
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
  display: block;
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
