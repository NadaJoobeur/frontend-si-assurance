import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { signup } from '../api/authApi'

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
     

    },
    onError: (error: AxiosError) => {
      console.error('Signup error:', error.response?.data || error.message)
    }
  })
}
