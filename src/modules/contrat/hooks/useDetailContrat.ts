import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getDetailContrat } from '../api/contratApi';
import type { NouveauContratPayload } from '../types/Contrat';
import { useEffect } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const useDetailContrat = (numeroContrat: string) => {
  const toast = useToast();

  const queryResult = useQuery<ApiResponse<NouveauContratPayload>, Error>({
    queryKey: ['contrat', numeroContrat],
    queryFn: () => getDetailContrat(numeroContrat),
    enabled: !!numeroContrat,
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
