// src/hooks/useDeleteContrat.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAgence } from '../api/AgenceApi';
import { useToast } from '@chakra-ui/react';

export const useDeleteAgence = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteAgence,
    onSuccess: (_, code_agence) => {
      // Invalider et rafraîchir les données
      queryClient.invalidateQueries({ 
        queryKey: ['agences'] 
      });
      
      toast({
        title: 'Agence supprimé',
        description: `L'agence' ${code_agence} a été supprimé avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: Error, code_agence) => {
      toast({
        title: 'Erreur lors de la suppression',
        description: `Impossible de supprimer l'agence' ${code_agence}: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};