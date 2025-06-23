import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { updatePersonne } from '../api/personneAPI'
import type { Personne } from '../types/personne'

export const useUpdatePersonne = () => {
  const queryClient = useQueryClient()

  return useMutation<boolean, AxiosError, { numeroIdentification: string; data: Partial<Personne> }>({
    mutationFn: ({ numeroIdentification, data }) =>
      updatePersonne(numeroIdentification, data),

    onSuccess: (data) => {
      console.log('✅ Personne mise à jour :', data)
      queryClient.invalidateQueries({ queryKey: ['personnes'] })
    },

    onError: (error) => {
      console.error('❌ Erreur lors de la mise à jour :', error.response?.data || error.message)
    },
  })
}
