// src/hooks/useUpdateSinistre.ts
import { useMutation } from '@tanstack/react-query';
import { updateSinistre } from '../api/SinistreApi';
import type { Sinistre } from '../types/Sinistre';
import { useToast } from '@chakra-ui/react';

export const useUpdateSinistre = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (params: { id: string; data: Partial<Sinistre> }) => 
      updateSinistre(params.id, params.data),
    onSuccess: () => {
      toast({
        title: 'Sinistre mis à jour',
        description: 'Les modifications ont été enregistrées avec succès',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur de mise à jour',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    updateSinistre: (id: string, data: Partial<Sinistre>) => mutation.mutateAsync({ id, data }),
    isUpdating: mutation.isPending,
    error: mutation.error
  };
};