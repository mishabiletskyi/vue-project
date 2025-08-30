<script setup>
import { ref } from 'vue'

const file = ref(null)
const dragging = ref(false)

function onDrop(e) {
  e.preventDefault()
  dragging.value = false
  if (e.dataTransfer.files.length) {
    file.value = e.dataTransfer.files[0]
  }
}

function onChange(e) {
  file.value = e.target.files[0]
}

function upload() {
  if (file.value) {
    localStorage.setItem('uploadedDocument', file.value.name)
    alert('Документ загружен')
    file.value = null
  }
}
</script>

<template>
  <div class="documents">
    <div
      class="drop-area"
      :class="{ over: dragging }"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop="onDrop"
    >
      <input id="fileInput" type="file" class="hidden" @change="onChange" />
      <label for="fileInput">
        <span v-if="!file">Перетащите файл или нажмите для выбора</span>
        <span v-else>{{ file.name }}</span>
      </label>
    </div>
    <button @click="upload" :disabled="!file">Загрузить</button>
  </div>
</template>

<style scoped>
.documents {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drop-area {
  border: 2px dashed #2a2f3a;
  padding: 40px;
  text-align: center;
  margin-bottom: 16px;
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  background: #14161b;
  transition: border-color 0.3s;
}

.drop-area.over {
  border-color: #ff4d00;
}

.hidden {
  display: none;
}

button {
  padding: 12px 24px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

button:hover {
  background: #ff1a1a;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

@media (max-width: 480px) {
  .drop-area {
    padding: 24px;
  }
}
</style>
