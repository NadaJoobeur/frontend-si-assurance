import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Intercepteur de requête : ajoute le token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('Token ajouté dans la requête:', token)
    } else {
      console.log('Pas de token dans localStorage')
    }
    return config
  },
  (error) => Promise.reject(error)
)


// **Intercepteur de réponse : gère les erreurs 401**
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Par exemple : on supprime le token et on redirige vers la page login
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosClient
