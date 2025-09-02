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
  <div class="image-slider">
    <div class="slides-container">
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="slide"
        :class="{ 'active': index === currentSlide }"
      >
        <img :src="slide" alt="Слайд" />
      </div>
    </div>
    
    <button @click="prevSlide" class="prev-button">‹</button>
    <button @click="nextSlide" class="next-button">›</button>

    <div class="dot-indicators">
      <span 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="dot" 
        :class="{ 'active': index === currentSlide }" 
        @click="showSlide(index)"
      ></span>
    </div>
  </div>
</template>

<style scoped>
/* Додайте стилі, які приховують неактивні слайди */
.slide {
  display: none;
}
.slide.active {
  display: block;
}

/* Оновлені стилі для розміщення кнопок */
.image-slider {
  position: relative;
}

.prev-button, .next-button {
  position: absolute;
  bottom: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
}

.prev-button {
  left: 20px;
}

.next-button {
  right: 20px;
}
</style>