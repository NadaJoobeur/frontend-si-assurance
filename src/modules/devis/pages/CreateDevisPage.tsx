import React from 'react';
import {
  Box,
  Container,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCreateDevis } from '../hooks/useCreateDevis';
import { DevisForm } from '../components/DevisForm';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import type { NouveauDevisPayload } from '../types/Devis';

const CreateDevisPage = () => {
  const navigate = useNavigate();
  const { mutate: createDevis, isPending } = useCreateDevis();
  const pageBg = useColorModeValue('gray.50', 'gray.900');

  const handleSubmit = (formData: NouveauDevisPayload) => {
    createDevis(formData, {
      onSuccess: () => {
        navigate('/devis/list'); // Redirection vers la liste des devis après création
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
            <DevisForm
              onSubmit={handleSubmit}
              isLoading={isPending}
              title="Création d'un nouveau devis"
            />
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CreateDevisPage;