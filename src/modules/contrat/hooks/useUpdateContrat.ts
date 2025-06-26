// src/hooks/useUpdateContrat.ts
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { updateContrat } from '../api/contratApi';
import type { NouveauContratPayload } from '../types/Contrat';

export const useUpdateContrat = () => {
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateContratHandler = async (
    numeroContrat: string,
    data: Partial<Omit<NouveauContratPayload, 'id'>>
  ) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const success = await updateContrat(numeroContrat, data);
      
      toast({
        title: 'Contrat mis à jour',
        description: `Le contrat ${numeroContrat} a été modifié avec succès`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      return success;
    } catch (err) {
      setError(err as Error);
      
      toast({
        title: 'Erreur de mise à jour',
        description: `Échec de la modification du contrat ${numeroContrat}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateContrat: updateContratHandler, isUpdating, error };
};