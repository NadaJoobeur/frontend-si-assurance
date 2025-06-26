// src/hooks/useDeleteContrat.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteContrat } from '../api/contratApi';
import { useToast } from '@chakra-ui/react';

export const useDeleteContrat = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: DeleteContrat,
    onSuccess: (_, numeroContrat) => {
      // Invalider et rafraîchir les données
      queryClient.invalidateQueries({ 
        queryKey: ['contrats'] 
      });
      
      toast({
        title: 'Contrat supprimé',
        description: `Le contrat ${numeroContrat} a été supprimé avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: Error, numeroContrat) => {
      toast({
        title: 'Erreur lors de la suppression',
        description: `Impossible de supprimer le contrat ${numeroContrat}: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};