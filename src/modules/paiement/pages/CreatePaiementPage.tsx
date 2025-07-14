import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

import { PaiementForm } from '../pages/PaiementForm'; // vérifier ce chemin
import { useCreatePaiement } from '../hooks/useCreatePaiement';
import type { NouveauPaiementPayload } from '../types/paiementTypes';
import { useAgences} from '../../agence/hooks/useAgences';
import type { Agence } from '../../agence/types/Agence';

const CreatePaiementPage = () => {
  
  const navigate = useNavigate();
  const { mutate: createPaiement, isPending } = useCreatePaiement();
  const pageBg = useColorModeValue('gray.50', 'gray.900');

  const { data: agences = [], isLoading: isAgencesLoading } = useAgences();
  
  const handleSubmit = (formData: NouveauPaiementPayload) => {
    createPaiement(formData, {
      onSuccess: () => {
        navigate('/paiement/list');
      },
      onError: (err: any) => {
        console.error('🔥 AxiosError ===>', err);
        console.error('🔥 AxiosError.response ===>', err.response);
        console.error('🔥 AxiosError.response.data ===>', err.response?.data);
      },
    });
  };


  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Sidebar />

      <Box flex="1" py={{ base: 8, md: 12 }} _focus={{ outline: 'none' }}>
        <Container maxW="container.md">
          {isPending ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <PaiementForm
              onSubmit={handleSubmit}
              isLoading={isPending}
              agences= {agences}
              isAgencesLoading={isAgencesLoading}
              title="Création d'un nouveau paiement"
            />
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CreatePaiementPage;
