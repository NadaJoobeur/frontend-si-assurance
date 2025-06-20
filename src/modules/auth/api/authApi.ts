import axiosClient from '../../../shared/api/axiosClient'
import type { LoginCredentials, SignupData } from '../types/Auth'
import type { AuthResponse } from '../types/user'



export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosClient.post('/auth/login', credentials)
  return response.data
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axiosClient.post('/auth/signup', data)
  return response.data
}