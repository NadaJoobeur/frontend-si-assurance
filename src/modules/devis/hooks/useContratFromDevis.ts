import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { 
  NouveauContratPayload,
  ContratFormData,
} from '../../contrat/types/Contrat';
import type { ContratCreationPayload } from '../../devis/types/Devis';
import { ContratFromDevis } from '../api/devisApi';

export const useContratFromDevis = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation<
    boolean,
    Error,
    ContratCreationPayload
  >({
    mutationFn: ({ id_devis, contrat, garanties, profilVehicule, pack }) => {
      // Vérification des champs obligatoires
      const requiredFields: (keyof ContratFormData)[] = [
        'numeroContrat', 'branche', 'codeBranche', 
        'offreCommerciale', 'codeOffreCommerciale'
      ];
      
      const missingFields = requiredFields.filter(field => !contrat[field]);
      if (missingFields.length > 0) {
        throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
      }

      // Construction du payload selon NouveauContratPayload
      const payload: Omit<NouveauContratPayload, 'id'> = {
        contrat: {
          ...contrat,
          // On s'assure que les champs venant du devis ne soient pas écrasés
          dateEffet: contrat.dateEffet,
          dateExpiration: contrat.dateExpiration,
          fractionnement: contrat.fractionnement
        },
        garanties,
        profilVehicule,
        pack: {
          ...pack,
          numeroContrat: contrat.numeroContrat
        }
      };

      return ContratFromDevis(id_devis, payload);
    },
    onSuccess: (_, { id_devis }) => {
      queryClient.invalidateQueries({ queryKey: ['devis', id_devis] });
      queryClient.invalidateQueries({ queryKey: ['devis'] });
      queryClient.invalidateQueries({ queryKey: ['contrats'] });
      
      toast({
        title: 'Contrat créé',
        description: `Contrat créé à partir du devis #${id_devis}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/contrat/list');
    },
    onError: (error, { id_devis }) => {
      toast({
        title: 'Erreur',
        description: `Échec création contrat (devis #${id_devis}): ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  });

  return {
    createContratFromDevis: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error
  };
};