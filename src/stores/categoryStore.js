import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import api from '@/services/api.js'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    loading: false,
    error: null
  }),
  actions: {
    // Initialize toast
    getToast() {
      return useToast()
    },

    async fetchCategories() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get('/categories?order=name.asc')
        this.categories = response.data
      } catch (error) {
        this.error = error.message
        console.error('CategoryStore: Error fetching categories:', error)
        
        this.getToast().error('Error loading categories', {
          timeout: 3000
        })
      } finally {
        this.loading = false
      }
    },

    async fetchCategory(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.get(`/categories?id=eq.${id}`)
        const category = response.data[0]
        return category
      } catch (error) {
        this.error = error.message
        console.error('Error fetching category:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    }
  }
})