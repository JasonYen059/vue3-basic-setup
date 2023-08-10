// import { ref } from 'vue'

export function useSession() {
  const getSession = (key) => {
    return sessionStorage.getItem(key)
  }
  const setSession = (key, value) => {
    sessionStorage.setItem(key, value)
  }
  const removeSession = (key) => {
    key ? sessionStorage.removeItem(key) : sessionStorage.clear()
  }

  return { getSession, setSession, removeSession }
}
