import { useMutation } from '@tanstack/react-query';
import { createSinistre } from '../api/SinistreApi';
import type { SinistreFormData} from '../types/Sinistre';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useCreateSinistre = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SinistreFormData) =>createSinistre(data),
    onSuccess: () => {
      toast({
        title: 'Sinistre créé',
        description: 'Le sinistre a été créé avec succès',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirection après succès
      navigate('/sinistre/list');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: `Échec de la création du sisnistre: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });
};