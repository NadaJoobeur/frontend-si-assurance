// src/hooks/useUpdateAgence.ts
import { useMutation } from '@tanstack/react-query';
import { updateAgence } from '../api/AgenceApi';
import type { Agence } from '../types/Agence';
import { useToast } from '@chakra-ui/react';

export const useUpdateAgence = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (params: { code: string; data: Partial<Agence> }) => 
      updateAgence(params.code, params.data),
    onSuccess: () => {
      toast({
        title: 'Agence mise à jour',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    updateAgence: (code: string, data: Partial<Agence>) => mutation.mutateAsync({ code, data }),
    isUpdating: mutation.isPending,
    error: mutation.error
  };
};