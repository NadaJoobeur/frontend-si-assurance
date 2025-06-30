import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCreateAgence } from '../hooks/useCreateAgence';
import { AgenceForm } from '../components/AgenceForm';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import type { AgenceFormData ,Agence} from '../types/Agence';

const CreateAgencePage = () => {
  const navigate = useNavigate();
  const { mutate: createAgence, isPending } = useCreateAgence();
  const pageBg = useColorModeValue('gray.50', 'gray.900');

  const handleSubmit = (formData: AgenceFormData) => {
    createAgence(formData as unknown as Agence, {
      onSuccess: () => {
        navigate('/agences/list');
      },
    });
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
            <AgenceForm
              onSubmit={handleSubmit}
              isLoading={isPending}
              title="Création d'une nouvelle agence"
            />
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CreateAgencePage;