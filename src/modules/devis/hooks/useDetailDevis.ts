import { useQuery } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { getDetailDevis } from '../api/devisApi';
import type { detailsDevisPayload } from '../types/Devis';
import { useEffect } from 'react';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const useDetailDevis = (id_devis: number) => {
  const toast = useToast();

  const queryResult = useQuery<ApiResponse<detailsDevisPayload>, Error>({
    queryKey: ['devis', id_devis],
    queryFn: () => getDetailDevis(id_devis),
    enabled: !!id_devis,
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
