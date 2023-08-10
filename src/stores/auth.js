import { ref,computed } from 'vue'
import { defineStore } from 'pinia'
import { useSession } from '../composables/useSession'

export const useAuthStore = defineStore('auth', () => {
  const { getSession, setSession, removeSession } = useSession()
  const access_token = ref(getSession('access_token'));
  const isAuth = computed(() => !!access_token.value);

  const setToken = (token, refreshToken) => {
    setSession('access_token', token)
    setSession('refresh_token', refreshToken)
    access_token.value = getSession('access_token');
  }

  const resetSession = () => {
    removeSession()
  }

  return { isAuth, setToken, resetSession }
})
