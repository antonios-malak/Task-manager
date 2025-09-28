import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine)
  const toast = useToast()

  const handleOnline = () => {
    isOnline.value = true
    toast.success('Connection restored! You are back online.', {
      timeout: 3000
    })
  }

  const handleOffline = () => {
    isOnline.value = false
    toast.error('No internet connection. Some features may be limited.', {
      timeout: 5000
    })
  }

  onMounted(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return {
    isOnline,
    isOffline: computed(() => !isOnline.value)
  }
}
