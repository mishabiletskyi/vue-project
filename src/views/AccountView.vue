<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'
import AccountSidebar from '../components/account/AccountSidebar.vue'
import AccountOverview from '../components/account/AccountOverview.vue'
import AccountTransactions from '../components/account/AccountTransactions.vue'
import AccountBonuses from '../components/account/AccountBonuses.vue'
import AccountSettings from '../components/account/AccountSettings.vue'

const router = useRouter()
const { user, logout } = useAuth()

const email = computed(() => user.value?.email || '')
const activeTab = ref('overview')

const components = {
  overview: AccountOverview,
  transactions: AccountTransactions,
  bonuses: AccountBonuses,
  settings: AccountSettings
}

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="account-page">
    <AccountSidebar :active="activeTab" :email="email" @change="tab => activeTab = tab" @logout="handleLogout" />
    <div class="account-content">
      <component :is="components[activeTab]" />
    </div>
  </div>
</template>

<style scoped>
.account-page {
  display: flex;
  min-height: calc(100vh - 140px);
}
.account-content {
  flex: 1;
  padding: 24px;
}
</style>
