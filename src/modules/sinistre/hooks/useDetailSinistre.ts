import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getDetailSinistre } from '../api/SinistreApi';
import type { Sinistre } from '../types/Sinistre';
import { useEffect } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const useDetailSinistre = (numeroSinistre: string) => {
  const toast = useToast();

  const queryResult = useQuery<ApiResponse<Sinistre>, Error>({
    queryKey: ['sinistres', numeroSinistre],
    queryFn: () => getDetailSinistre(numeroSinistre),
    enabled: !!numeroSinistre,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (queryResult.isError) {
      toast({
        title: 'Erreur',
        description: `Impossible de charger les détails: ${queryResult.error?.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [queryResult.isError, queryResult.error, toast]);

  return queryResult;
};
