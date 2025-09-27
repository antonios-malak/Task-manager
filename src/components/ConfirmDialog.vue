<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="cancel"
  >
    <div class="fixed inset-0 bg-transparent backdrop-blur-sm bg-opacity-50 transition-opacity"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all">
        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            {{ title }}
          </h3>
          
          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ message }}
          </p>
          
          <div class="flex gap-3 justify-end">
            <button
              @click="cancel"
              class="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:shadow-md"
            >
              {{ cancelText }}
            </button>
            <button
              @click="confirm"
              class="px-6 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:shadow-md hover:scale-105"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'confirm message'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>
