import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import api from '@/services/api.js'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
    filters: {
      category_id: null,
      completed: null,
      priority: null
    },
    pagination: {
      limit: 20,
      offset: 0,
      hasMore: true
    },
    // Modal state
    modal: {
      isOpen: false,
      isEditMode: false,
      taskData: null
    }
  }),
  actions: {
    // Initialize toast
    getToast() {
      return useToast()
    },

    async fetchTasks() {
      this.loading = true
      this.error = null
      
      try {
        this.pagination.offset = 0
        this.tasks = []

        const query = {
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          order: 'created_at.desc'
        }

        if (this.filters.category_id) {
          query.category_id = `eq.${this.filters.category_id}`
        }
        if (this.filters.completed !== null && this.filters.completed !== undefined) {
          query.completed = `eq.${this.filters.completed}`
        }
        if (this.filters.priority) {
          query.priority = `eq.${this.filters.priority}`
        }

        const response = await api.get('/tasks', { params: query })
        const newTasks = response.data
        this.tasks = newTasks
        this.pagination.hasMore = newTasks.length === this.pagination.limit
        this.pagination.offset += this.pagination.limit
        
      } catch (error) {
        this.error = error.message
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    async loadMoreTasks() {
      if (!this.pagination.hasMore || this.loading) return
      
      this.loading = true
      this.error = null
      
      try {
        const query = {
          limit: this.pagination.limit,
          offset: this.pagination.offset,
          order: 'created_at.desc'
        }
        if (this.filters.category_id) {
          query.category_id = `eq.${this.filters.category_id}`
        }
        if (this.filters.completed !== null && this.filters.completed !== undefined) {
          query.completed = `eq.${this.filters.completed}`
        }
        if (this.filters.priority) {
          query.priority = `eq.${this.filters.priority}`
        }
        const response = await api.get('/tasks', { params: query })
        const newTasks = response.data
        this.tasks = [...this.tasks, ...newTasks] 
        this.pagination.hasMore = newTasks.length === this.pagination.limit
        this.pagination.offset += this.pagination.limit
      } catch (error) {
        this.error = error.message
        console.error('Error loading more tasks:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchTask(id) {
      this.loading = true
      this.error = null
      try {
        const existingTask = this.tasks.find(task => task.id == id)
        if (existingTask) {
          this.currentTask = existingTask
          console.log('Found task in store:', this.currentTask)
          return
        }
        const response = await api.get(`/tasks?id=eq.${id}`)
        if (response.data && response.data.length > 0) {
          this.currentTask = response.data[0] // Supabase returns array
          console.log('Fetched task from API:', this.currentTask)
        } else {
          this.currentTask = null
          console.log('Task not found in API')
        }
      } catch (error) {
        this.error = error.message
        console.error('Error fetching task:', error)
        this.currentTask = null
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.post('/tasks', taskData)
        const newTask = response.data[0]
        await this.fetchTasks()
        
        // Show success toast
        this.getToast().success('Task created successfully!', {
          timeout: 3000
        })
        
        return newTask
      } catch (error) {
        this.error = error.message
        console.error('Error creating task:', error)
        
        // Show error toast
        this.getToast().error('Error creating task', {
          timeout: 3000
        })
        
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(id, taskData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.patch(`/tasks?id=eq.${id}`, taskData)
        const updatedTask = response.data[0]
        await this.fetchTasks()
        
        // Show success toast
        this.getToast().success('Task updated successfully!', {
          timeout: 3000
        })
        
        return updatedTask
      } catch (error) {
        this.error = error.message
        console.error('Error updating task:', error)
        
        // Show error toast
        this.getToast().error('Error updating task', {
          timeout: 3000
        })
        
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id) {
      this.loading = true
      this.error = null
      
      try {
        await api.delete(`/tasks?id=eq.${id}`)
        await this.fetchTasks()

        // Show success toast
        this.getToast().success('Task deleted successfully!', {
          timeout: 3000
        })
        return true
      } catch (error) {
        this.error = error.message
        console.error('Error deleting task:', error)
        
        // Show error toast
        this.getToast().error('Error deleting task', {
          timeout: 3000
        })
        
        throw error
      } finally {
        this.loading = false
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
      this.fetchTasks()
    },

    clearFilters() {
      this.filters = {
        category_id: null,
        completed: null,
        priority: null
      }
      this.fetchTasks()
    },

    async toggleTaskCompletion(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        try {
          await this.updateTask(id, { completed: !task.completed })
          const status = task.completed ? 'incomplete' : 'completed'
          this.getToast().success(`Task marked as ${status}!`, {
            timeout: 3000
          })
        } catch (error) {
          console.error('Error toggling task completion:', error)
        }
      }
    },

    clearError() {
      this.error = null
    },

    openAddModal() {
      this.modal.isOpen = true
      this.modal.isEditMode = false
      this.modal.taskData = null
    },

    openEditModal(taskData) {
      this.modal.isOpen = true
      this.modal.isEditMode = true
      this.modal.taskData = taskData
    },

    closeModal() {
      this.modal.isOpen = false
      this.modal.isEditMode = false
      this.modal.taskData = null
    },

  }
})
