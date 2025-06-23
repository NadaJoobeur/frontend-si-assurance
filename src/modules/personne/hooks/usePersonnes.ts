import { useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Personne } from '../types/personne';
import { getPersonnes } from '../api/personneAPI';

export const usePersonnes = (ownerId?: string) => {
  const query = useQuery<Personne[], AxiosError>({
    queryKey: ['personnes', ownerId],
    queryFn: () => getPersonnes(ownerId!), // <-- ici le !
    enabled: !!ownerId,
    staleTime: 60000,
  });

  useEffect(() => {
    if (query.data) {
      console.log('Liste des personnes chargée ✅', query.data);
    }
    if (query.error) {
      console.error('Erreur chargement personnes ❌:', query.error.response?.data || query.error.message);
    }
  }, [query.data, query.error]);

  return query;
};

