<script setup>
import { ref } from 'vue'

import AccountPersonal from '../components/account/AccountPersonal.vue'
import AccountDocuments from '../components/account/AccountDocuments.vue'
import AccountPassword from '../components/account/AccountPassword.vue'
import AccountLimits from '../components/account/AccountLimits.vue'

const tabs = [
  { id: 'personal', label: 'Личный кабинет' },
  { id: 'documents', label: 'Документы' },
  { id: 'password', label: 'Смена пароля' },
  { id: 'limits', label: 'Лимиты' }
]

const activeTab = ref('personal')

const components = {
  personal: AccountPersonal,
  documents: AccountDocuments,
  password: AccountPassword,
  limits: AccountLimits
}
</script>

<template>
  <div class="account-page">
    <nav class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="{ active: activeTab === t.id }"
        @click="activeTab = t.id"
      >
        {{ t.label }}
      </button>
    </nav>
    <div class="account-content">
      <component :is="components[activeTab]" />
    </div>
  </div>
</template>

<style scoped>
.account-page {
  padding: 24px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tabs button {
  padding: 12px 20px;
  background: #1e232d;
  color: #f1f5f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.tabs button.active {
  background: #ff4d00;
  color: #fff;
}

.account-content {
  max-width: 960px;
  margin: 0 auto;
}
</style>

