<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Список шляхів до зображень (з папки public)
const slides = ref([
  '/img/card1.webp',
  '/img/card2.webp',
  '/img/card3.webp',
  '/img/card4.webp',
  '/img/card5.webp',
  '/img/card6.webp',
  '/img/card10.webp',
  '/img/card11.webp',
  '/img/card12.webp',
  '/img/card13.webp',
  '/img/card14.webp',
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
</style> -->


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- ВАЖЛИВО! Вставте сюди ваш URL до бакету 'img' ---
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/img';

// Список назв файлів для слайдів
const slides = ref([
  'card1.webp',
  'card2.webp',
  'card3.webp',
  'card4.webp',
  'card5.webp',
  'card6.webp',
  'card10.webp',
  'card11.webp',
  'card12.webp',
  'card13.webp',
  'card14.webp',
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
        <img :src="`${SUPABASE_URL}/${slide}`" alt="Слайд" />
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