import { useQuery } from '@tanstack/react-query';
import { getDevis } from '../api/devisApi';
import type { Devis } from '../types/Devis';

export const useDevis = () => {
  return useQuery< Devis[], Error>({
    queryKey: ['devis'],
    queryFn: () => getDevis(),
      });
};
