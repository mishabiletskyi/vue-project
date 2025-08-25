<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Список шляхів до зображень (з папки public)
const slides = ref([
  '/img/card1.png',
  '/img/card2.png',
  '/img/card3.png',
  '/img/card4.png',
  '/img/card5.png',
  '/img/card6.png',
  '/img/card10.png',
  '/img/card11.png',
  '/img/card12.png',
  '/img/card13.png',
  '/img/card14.png',
]);

const currentSlide = ref(0);
let autoSlideInterval = null;

function showSlide(index) {
  currentSlide.value = index;
}

function nextSlide() {
  const newIndex = (currentSlide.value + 1) % slides.value.length;
  showSlide(newIndex);
}

function prevSlide() {
  const newIndex = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
  showSlide(newIndex);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Запускаємо слайдер, коли компонент з'явився на сторінці
onMounted(() => {
  startAutoSlide();
});

// Зупиняємо, коли компонент зникає (щоб не було витоків пам'яті)
onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <section class="slider-section">
    <div class="slider-wrapper">
      <div class="slider-images">
        <img
          v-for="(slide, index) in slides"
          :key="index"
          :src="slide"
          :alt="`Слайд ${index + 1}`"
          class="slide"
          :class="{ active: index === currentSlide }"
        />
      </div>
      <button class="slider-nav prev-btn" @click="prevSlide">‹</button>
      <button class="slider-nav next-btn" @click="nextSlide">›</button>
    </div>
  </section>
</template>