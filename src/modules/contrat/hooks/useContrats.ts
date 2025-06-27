import { useQuery } from '@tanstack/react-query';
import { getContrat } from '../api/contratApi';
import type { ContratFormData } from '../types/Contrat';

export const useContrats = (ownerId: string) => {
  return useQuery<ContratFormData[], Error>({
    queryKey: ['contrats', ownerId],
    queryFn: () => getContrat(ownerId),
    enabled: !!ownerId, // ✅ appel seulement si ownerId est défini
  });
};
