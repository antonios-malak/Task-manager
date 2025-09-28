<template>
    <router-link :to="{ name: 'TaskDetail', params: { id: task.id } }">
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div class="h-32 bg-gray-100 relative overflow-hidden">
      <img 
        :src="task.image_url || FallbackImage" 
        :alt="task.title"
        class="w-full h-full object-cover"
        @error="handleImageError"
        @load="handleImageLoad"
      />
    </div>
    
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <span 
          class="
            ' py-1 px-2 rounded-full text-xs font-semibold uppercase tracking-wide'
          "
          :class="priorityClasses[task.priority] || 'bg-gray-100 text-gray-600'"
        >
          {{ task.priority }}
        </span>
        
        <button
          @click.stop.prevent="toggleCompletion"
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200',
            task.completed 
              ? 'bg-green-500 text-white shadow-md' 
              : 'bg-red-500 text-white hover:bg-red-600'
          ]"
        >
          {{ task.completed ? 'Completed' : 'Incomplete' }}
        </button>
      </div>
      
      <div class="mb-3">
        <h3 :class="['text-sm font-bold text-gray-900 mb-1 line-clamp-2', task.completed?'line-through':'']">{{ task.title }}</h3>
        <p v-if="task.description" class="text-gray-600 text-xs line-clamp-2">{{ task.description }}</p>
      </div>
      
      <div class="flex items-center justify-between">
        <div 
          v-if="taskCategory"
          class="flex items-center px-2 py-1 rounded-md text-xs font-medium"
          :style="{
            backgroundColor: taskCategory.color + '15' ,
            color: taskCategory.color
          }"
        >
          <div 
            class="w-1.5 h-1.5 rounded-full mr-1.5"
            :style="{ backgroundColor: taskCategory.color }"
          ></div>
          {{ taskCategory.name }}
        </div>
        <div v-else class="text-gray-400 text-xs">No category</div>
        
        <div v-if="task.due_date" class="text-gray-500 text-xs">
          {{ formatDate(task.due_date) }}
        </div>
      </div>
    </div>
  </div>
  </router-link>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useCategoryStore } from '@/stores/categoryStore'
import FallbackImage from '../assets/imgs/Nature.png'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const imageError = ref(false)

// Get category by ID from categoryStore
const taskCategory = computed(() => {
  if (!props.task.category_id) return null
  return categoryStore.categories.find(cat => cat.id === props.task.category_id) || null
})

const priorityClasses = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
}

const toggleCompletion = () => {
  taskStore.toggleTaskCompletion(props.task.id)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const handleImageError = (event) => {
  console.warn(`Image failed to load for task ${props.task.id}:`, event.target.src)
  imageError.value = true
  event.target.src = FallbackImage
}

const handleImageLoad = () => {
  imageError.value = false
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>