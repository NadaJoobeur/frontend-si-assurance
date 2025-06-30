import { useState, useEffect, useMemo } from 'react';
import { getClientContrat } from '../api/personneAPI';
import type { ContratFormData } from '../../contrat/types/Contrat'

interface Filters {
  etatContrat: string;
  echeance?: string;
}

export const useContratsClient = (
  numeroIdentification: string,
  filters: Filters = { etatContrat: 'ACTIF' }
) => {
  const [contrats, setContrats] = useState<ContratFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; details?: string } | null>(null);

  // On mémorise les filtres pour éviter les boucles infinies
  const memoFilters = useMemo(() => filters, [filters.etatContrat, filters.echeance]);

  useEffect(() => {
    const fetchContrats = async () => {
      if (!numeroIdentification) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await getClientContrat(numeroIdentification, memoFilters);
        setContrats(data);
      } catch (err) {
        const error = err as Error & { response?: { data?: { message?: string } } };
        setError({
          message: 'Échec du chargement des contrats',
          details: error.response?.data?.message || error.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContrats();
  }, [numeroIdentification, memoFilters]); // Utilise les filtres mémorisés

  const refetch = async (newFilters: Filters = memoFilters) => {
    try {
      setLoading(true);
      const data = await getClientContrat(numeroIdentification, newFilters);
      setContrats(data);
      setError(null);
    } catch (err) {
      const error = err as Error & { response?: { data?: { message?: string } } };
      setError({
        message: 'Échec du rechargement des contrats',
        details: error.response?.data?.message || error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return { contrats, loading, error, refetch };
};