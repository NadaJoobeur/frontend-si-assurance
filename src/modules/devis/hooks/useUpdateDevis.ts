// src/hooks/useUpdateDevis.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDevis } from '../api/devisApi';
import { useToast } from '@chakra-ui/react';
import type { NouveauDevisPayload } from '../types/Devis';

export const useUpdateDevis = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation<
    boolean, 
    Error, 
    { id_devis: number; data: Partial<NouveauDevisPayload> }
  >({
    mutationFn: ({ id_devis, data }) => updateDevis(id_devis, data),
    onSuccess: (_, { id_devis }) => {
      queryClient.invalidateQueries({ queryKey: ['devis', id_devis] });
      queryClient.invalidateQueries({ queryKey: ['devis'] });
      
      toast({
        title: 'Devis mis à jour',
        description: `Le devis #${id_devis} a été modifié avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error, { id_devis }) => {
      toast({
        title: 'Erreur',
        description: `Échec de la mise à jour du devis #${id_devis}: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  return {
    updateDevis: mutation.mutate,
    isUpdating: mutation.isPending, // Utilisez isPending au lieu de isLoading
    error: mutation.error
  };
};