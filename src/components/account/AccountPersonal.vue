<script setup>
import { reactive, ref, onMounted } from 'vue'

const form = reactive({
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  taxId: '',
  country: '',
  region: '',
  city: '',
  address: '',
  postalCode: '',
  email: '',
  phone: ''
})

const message = ref('')

const avatar = ref('')


onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('personalInfo') || '{}')
  Object.assign(form, saved)
  avatar.value = localStorage.getItem('avatar') || ''

})

function save() {
  localStorage.setItem('personalInfo', JSON.stringify(form))
  message.value = 'Данные сохранены'
}


function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value = reader.result
      localStorage.setItem('avatar', avatar.value)
    }
    reader.readAsDataURL(file)
  }
}

</script>

<template>
  <form class="personal-form" @submit.prevent="save">
    <div class="avatar-upload">
      <img v-if="avatar" :src="avatar" alt="Аватар" class="avatar" />
      <label class="upload-label">
        Загрузить фото профиля
        <input type="file" accept="image/*" @change="onAvatarChange" />
      </label>
    </div>


    <h2>Личная информация</h2>
    <div class="grid">
      <label>
        Фамилия
        <input v-model="form.lastName" required />
      </label>
      <label>
        Имя
        <input v-model="form.firstName" required />
      </label>
      <label>
        Отчество
        <input v-model="form.middleName" />
      </label>
      <label>
        Дата рождения
        <input v-model="form.birthDate" type="date" required />
      </label>
      <label>
        ИНН
        <input v-model="form.taxId" />
      </label>
    </div>

    <h2>Адрес проживания</h2>
    <div class="grid">
      <label>
        Страна
        <input v-model="form.country" />
      </label>
      <label>
        Регион
        <input v-model="form.region" />
      </label>
      <label>
        Город
        <input v-model="form.city" />
      </label>
      <label>
        Адрес
        <input v-model="form.address" />
      </label>
      <label>
        Почтовый индекс
        <input v-model="form.postalCode" />
      </label>
    </div>

    <h2>Контакты</h2>
    <div class="grid">
      <label>
        E-mail
        <input v-model="form.email" type="email" />
      </label>
      <label>
        Телефон
        <input v-model="form.phone" />
      </label>
    </div>

    <button type="submit">Сохранить</button>
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<style scoped>
.personal-form {
  background: #14161b;
  padding: 24px;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.avatar-upload {
  text-align: center;
  margin-bottom: 24px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.upload-label {
  cursor: pointer;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  background: #1e232d;
  color: #f1f5f9;
}

.upload-label input {
  display: none;
}

.grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 8px;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}

button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #ff1a1a;
}

.message {
  margin-top: 12px;
  color: #ff9a00;
  text-align: center;
}


@media (max-width: 600px) {
  .personal-form {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 481px) and (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

