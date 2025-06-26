import { useState, useEffect } from 'react';
import { getClientContrat } from '../api/personneAPI'; // Adaptez le chemin d'import
import type { ContratFormData } from '../../contrat/types/Contrat'


export const useContratsClient = (
  numeroIdentification: string,
  filters = { etatContrat: 'ACTIF' }
) => {
  const [contrats, setContrats] = useState<ContratFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; details?: any } | null>(null);

  useEffect(() => {
    const fetchContrats = async () => {
      if (!numeroIdentification) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const data = await getClientContrat(numeroIdentification, filters);
        setContrats(data);
      } catch (err) {
        setError({
          message: 'Échec du chargement des contrats',
          details: err.response?.data?.message || err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContrats();
  }, [numeroIdentification, filters.etatContrat, filters.echeance]);

  const refetch = async (newFilters = filters) => {
    try {
      setLoading(true);
      const data = await getClientContrat(numeroIdentification, newFilters);
      setContrats(data);
      setError(null);
    } catch (err) {
      setError({
        message: 'Échec du rechargement des contrats',
        details: err.response?.data?.message || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return { contrats, loading, error, refetch };
};