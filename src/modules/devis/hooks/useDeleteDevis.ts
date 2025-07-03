// src/hooks/useDeleteDevis.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteDevis } from '../api/devisApi';
import { useToast } from '@chakra-ui/react';
import type { AxiosError } from 'axios';

export const useDeleteDevis = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: (id_devis: number) => DeleteDevis(id_devis),
    onSuccess: (_, id_devis) => {
      // Invalider les requêtes pour rafraîchir les données
      queryClient.invalidateQueries({ 
        queryKey: ['devis'] 
      });
      queryClient.invalidateQueries({
        queryKey: ['devis', id_devis]
      });

      toast({
        title: 'Succès',
        description: `Le devis #${id_devis} a été supprimé avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
    onError: (error, id_devis) => {
      const errorMessage = error.response?.data?.message || error.message;

      toast({
        title: 'Erreur',
        description: `Échec de la suppression du devis #${id_devis}: ${errorMessage}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    },
  });
};