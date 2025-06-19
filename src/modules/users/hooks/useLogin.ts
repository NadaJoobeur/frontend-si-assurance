import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { login } from '../api/authApi'

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      // rediriger ou afficher un message
    },
    onError: (error: AxiosError) => {
      console.error('Login error:', error.response?.data || error.message)
    }
  })
}
