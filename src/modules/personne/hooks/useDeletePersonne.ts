import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { deletePersonne } from '../api/personneAPI'

export const useDeletePersonne = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, {  numeroIdentification: string }>({
    mutationFn: ({ numeroIdentification }) =>
      deletePersonne(numeroIdentification),

    onSuccess: () => {
      console.log('✅ Personne supprimée avec succès')
      queryClient.invalidateQueries({ queryKey: ['personnes'] })
    },

    onError: (error) => {
      console.error('❌ Erreur suppression personne :', error.response?.data || error.message)
    },
  })
}
