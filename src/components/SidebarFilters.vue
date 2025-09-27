<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-6">Filter Tasks</h3>
    
    <div class="space-y-6">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-3">Category</label>
        <select 
          v-model="selectedCategory"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors duration-200"
        >
          <option value="" disabled>Select Category</option>
          <option 
            v-for="category in categories" 
            :key="category.id" 
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Priority Filter -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-3">Priority</label>
        <select 
          v-model="selectedPriority"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors duration-200"
        >
          <option value="" disabled>Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-3">Status</label>
        <select 
          v-model="selectedStatus"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-colors duration-200"
        >
          <option value="" disabled>Select Status</option>
          <option value="false">Incomplete</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <!-- Apply Filter Button -->
      <button
        @click="applyFilters"
        class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Apply Filters
      </button>

     

      <!-- Clear Filters Button -->
      <button
        @click="clearFilters"
        class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Clear All
      </button> 
    </div>
    <div class="mt-[60px]">
      
       <!-- Add Task Button -->
       <button
        @click="addTask"
        class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
      >
        <PlusIcon class="mr-2" />
        Add New Task
      </button>
    </div>
   
  </div>

  <!-- Task Modal Form -->
  <TaskModalForm
    :is-open="taskStore.modal.isOpen"
    :is-edit-mode="taskStore.modal.isEditMode"
    :task-data="taskStore.modal.taskData"
    @close="taskStore.closeModal"
    @success="handleModalSuccess"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useTaskStore } from '@/stores/taskStore'
import TaskModalForm from './TaskModalForm.vue'
import PlusIcon from '@/assets/icons/PlusIcon.vue'

const emit = defineEmits(['closeSidebar'])

const categoryStore = useCategoryStore()
const taskStore = useTaskStore()

const categories = computed(() => categoryStore.categories)
const selectedCategory = ref('')
const selectedPriority = ref('')
const selectedStatus = ref('')

const applyFilters = () => {
  const filters = {}
  
  if (selectedCategory.value) {
    filters.category_id = selectedCategory.value
  }
  if (selectedPriority.value) {
    filters.priority = selectedPriority.value
  }
  if (selectedStatus.value !== '') {
    filters.completed = selectedStatus.value === 'true'
  }
  
  taskStore.setFilters(filters)
  
  if (window.innerWidth < 768) {
    emit('closeSidebar')
  }
}

const clearFilters = () => {
  selectedCategory.value = ''
  selectedPriority.value = ''
  selectedStatus.value = ''
  taskStore.clearFilters()
}
const addTask = () => {
  taskStore.openAddModal()
  
  // Close sidebar on mobile after opening modal
  if (window.innerWidth < 768) {
    emit('closeSidebar')
  }
}

const handleModalSuccess = () => {
  // Refresh  task list 
  taskStore.fetchTasks()
}
onMounted(() => {
  categoryStore.fetchCategories()
})
</script>
