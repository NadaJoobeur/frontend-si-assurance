// src/hooks/useDeleteDevis.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteSinistre } from '../api/SinistreApi';
import { useToast } from '@chakra-ui/react';
import type { AxiosError } from 'axios';

export const useDeleteSinistre = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<void, AxiosError<{ message?: string }>, string>({
mutationFn: (numeroSinistre: string) => DeleteSinistre(numeroSinistre),
    onSuccess: (_, numeroSinistre) => {
      // Invalider les requêtes pour rafraîchir les données
      queryClient.invalidateQueries({ 
        queryKey: ['sinistres'] 
      });
      queryClient.invalidateQueries({
        queryKey: ['sinistres',numeroSinistre]
      });

      toast({
        title: 'Succès',
        description: `Le sinistre #${numeroSinistre} a été supprimé avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
    onError: (error, numeroSinistre) => {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        title: 'Erreur',
        description: `Échec de la suppression du sinistre #${numeroSinistre}: ${errorMessage}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
  });
};