<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Offline Indicator -->
    <div 
      v-if="isOffline" 
      class="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 text-sm font-medium"
    >
      You are offline. Some features may be limited.
    </div>
    
    <router-view />
  </div>
</template>

<script setup>
import { useNetworkStatus } from '@/composables/useNetworkStatus'

const { isOffline } = useNetworkStatus()
</script>
