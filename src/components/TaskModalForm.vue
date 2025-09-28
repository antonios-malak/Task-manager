<template>
  <!-- Modal Overlay - Teleported to body -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeModal"
    >
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-transparent backdrop-blur-sm bg-opacity-75" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="relative z-10 inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">
              {{ isEditMode ? 'Edit Task' : 'Add New Task' }}
            </h3>
            <p v-if="isOffline" class="text-sm text-red-500 mt-1">
              📡 Offline - Changes will be saved when connection is restored
            </p>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <CloseModalIcon />
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                errors.title ? 'border-red-500' : 'border-gray-300'
              ]"
              placeholder="Enter task title"
              maxlength="255"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 resize-none"
              placeholder="Enter task description (optional)"
            ></textarea>
          </div>

          <!-- Priority and Category Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Priority -->
            <div>
              <label for="priority" class="block text-sm font-semibold text-gray-700 mb-2">
                Priority <span class="text-red-500">*</span>
              </label>
              <select
                id="priority"
                v-model="form.priority"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  errors.priority ? 'border-red-500' : 'border-gray-300'
                ]"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p v-if="errors.priority" class="mt-1 text-sm text-red-600">{{ errors.priority }}</p>
            </div>

            <!-- Category -->
            <div>
              <label for="category_id" class="block text-sm font-semibold text-gray-700 mb-2">
                Category <span class="text-red-500">*</span>
              </label>
              <select
                id="category_id"
                v-model="form.category_id"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  errors.category_id ? 'border-red-500' : 'border-gray-300'
                ]"
              >
                <option value="">Select Category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.category_id" class="mt-1 text-sm text-red-600">{{ errors.category_id }}</p>
            </div>
          </div>

          <!-- Due Date and Image URL Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Due Date -->
            <div>
              <label for="due_date" class="block text-sm font-semibold text-gray-700 mb-2">
                Due Date
              </label>
              <input
                id="due_date"
                v-model="form.due_date"
                type="date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              />
            </div>

            <!-- Image URL -->
            <div>
              <label for="image_url" class="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                id="image_url"
                v-model="form.image_url"
                type="url"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  errors.image_url ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="https://example.com/image.jpg"
                maxlength="500"
              />
              <p v-if="errors.image_url" class="mt-1 text-sm text-red-600">{{ errors.image_url }}</p>
            </div>
          </div>

          <!-- Completed Status -->
          <div class="flex items-center">
            <input
              id="completed"
              v-model="form.completed"
              type="checkbox"
              class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label for="completed" class="ml-2 block text-sm font-semibold text-gray-700">
              Mark as completed
            </label>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting || isOffline"
              class="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center"
            >
              <div
                v-if="isSubmitting"
                class="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              ></div>
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Task' : 'Add Task') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useCategoryStore } from '@/stores/categoryStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import CloseModalIcon from '@/assets/icons/CloseModalIcon.vue'
import { useNetworkStatus } from '@/composables/useNetworkStatus'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  isEditMode: {
    type: Boolean,
    default: false
  },
  taskData: {
    type: Object,
    default: () => ({})
  }
})


// Stores
const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { isOffline } = useNetworkStatus()

// State
const isSubmitting = ref(false)
const errors = ref({})

// Form data
const form = ref({
  title: '',
  description: '',
  priority: '',
  category_id: '',
  due_date: '',
  completed: false,
  image_url: ''
})

// Computed
const categories = computed(() => categoryStore.categories)

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.title.trim()) {
    errors.value.title = 'Title is required'
  } else if (form.value.title.length > 255) {
    errors.value.title = 'Title must be at most 255 characters'
  }
  
  if (!form.value.priority) {
    errors.value.priority = 'Priority is required'
  }
  
  if (!form.value.category_id) {
    errors.value.category_id = 'Category is required'
  }
  
  if (form.value.image_url && form.value.image_url.trim()) {
    try {
      new URL(form.value.image_url)
    } catch {
      errors.value.image_url = 'Please enter a valid URL'
    }
  }
  
  return Object.keys(errors.value).length === 0
}

// Methods
const closeModal = () => {
 taskStore.closeModal()
  resetForm()
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    priority: '',
    category_id: '',
    due_date: '',
    completed: false,
    image_url: ''
  }
  errors.value = {}
}

const initializeForm = () => {
  if (props.isEditMode && props.taskData) {
    form.value = {
      title: props.taskData.title || '',
      description: props.taskData.description || '',
      priority: props.taskData.priority || '',
      category_id: props.taskData.category_id || '',
      due_date: props.taskData.due_date ? props.taskData.due_date.split('T')[0] : '',
      completed: props.taskData.completed || false,
      image_url: props.taskData.image_url || ''
    }
  } else {
    resetForm()
  }
}

const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    const cleanedValues = {
      ...form.value,
      due_date: form.value.due_date && form.value.due_date.trim() !== '' ? form.value.due_date : null,
      image_url: form.value.image_url && form.value.image_url.trim() !== '' ? form.value.image_url : null,
      description: form.value.description && form.value.description.trim() !== '' ? form.value.description : null
    }
    
    if (props.isEditMode) {
      await taskStore.updateTask(props.taskData.id, cleanedValues)
    } else {
      await taskStore.createTask(cleanedValues)
    }
    
    await taskStore.fetchTask(props.taskData.id)
    closeModal()
  } catch (error) {
    console.error('Error saving task:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Watchers
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    initializeForm()
  }
})

watch(() => props.taskData, () => {
  if (props.isOpen) {
    initializeForm()
  }
}, { deep: true })

// Lifecycle
onMounted(async () => {
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories()
  }
})
</script>