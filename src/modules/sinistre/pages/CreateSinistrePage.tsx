import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCreateSinistre } from '../hooks/useCreateSinistre';
import { SinistreForm } from '../components/SinistreForm';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import type { SinistreFormData } from '../types/Sinistre';

const CreateSinistrePage = () => {
  const navigate = useNavigate();
  const { mutate: createSinistre, isPending } = useCreateSinistre();
  const pageBg = useColorModeValue('gray.50', 'gray.900');

// Dans le handleSubmit :
const handleSubmit = (formData: SinistreFormData) => {
  const immatArray = formData.numeroImmatriculation
    ? formData.numeroImmatriculation.split(',').map(s => s.trim())
    : [];

  createSinistre(
    {
      ...formData,
      numeroImmatriculation: immatArray, // OK car c’est ton payload API interne
    } as any, // 👈 ou crée un type `CreateSinistrePayload` séparé
    {
      onSuccess: () => navigate('/sinistre/list'),
    }
  );
};

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Navbar />

      <Box 
        flex="1" 
        py={{ base: 8, md: 12 }}
        _focus={{ outline: "none" }}
      >
        <Container maxW="container.md">
          {isPending ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <SinistreForm
              onSubmit={handleSubmit}
              isLoading={isPending}
              title="Déclaration d'un nouveau sinistre"
            />
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CreateSinistrePage;