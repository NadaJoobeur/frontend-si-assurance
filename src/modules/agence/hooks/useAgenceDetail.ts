// src/hooks/useAgenceDetail.ts
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getDetailAgence } from '../api/AgenceApi';
import type { Agence } from '../types/Agence';
import { useEffect } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const useAgenceDetail = (code_agence: string) => {
  const toast = useToast();

  const queryResult = useQuery<ApiResponse<Agence>, Error>({
    queryKey: ['agence', code_agence],
    queryFn: () => getDetailAgence(code_agence),
    enabled: !!code_agence,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (queryResult.isError) {
      toast({
        title: 'Erreur',
        description: queryResult.error?.message || 'Erreur lors du chargement des détails',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [queryResult.isError, queryResult.error, toast]);

  return {
    ...queryResult,
    data: queryResult.data?.data // Accès direct à la donnée
  };
};