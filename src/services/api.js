import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'An error occurred'
      console.error('API Error:', errorMessage)
      error.message = errorMessage
    } else if (error.request) {
      console.error('Network Error: No response from server')
    } else {
      console.error('Request Error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api
