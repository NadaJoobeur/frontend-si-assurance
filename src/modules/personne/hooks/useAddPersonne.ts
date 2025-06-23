import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { addPersonne } from '../api/personneAPI';
import type { Personne } from '../types/personne';

export const useAddPersonne = () => {
  const queryClient = useQueryClient();

  return useMutation<Personne, AxiosError, { ownerId: string; data: Omit<Personne, 'id'> }>({
    mutationFn: ({ ownerId, data }) => addPersonne(ownerId, data),

    onSuccess: (data) => {
      console.log(' Personne ajoutée avec succès :', data);
      queryClient.invalidateQueries({ queryKey: ['personnes'] });
    },

    onError: (error) => {
      console.error(' Erreur lors de l’ajout de la personne :', error.response?.data || error.message);
    },
  });
};
