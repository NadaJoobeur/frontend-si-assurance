// src/modules/sinistre/pages/SinistreUpdatePage.tsx
import {
  Box,
  Container,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateSinistre } from '../hooks/useUpdateSinistre';
import { useDetailSinistre } from '../hooks/useDetailSinistre';
import { SinistreForm } from '../components/SinistreForm';
import type { Sinistre } from '../types/Sinistre';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

const SinistreUpdatePage = () => {
  const { numeroSinistre} = useParams<{ numeroSinistre: string }>();
  const navigate = useNavigate();
console.log(numeroSinistre)
  const { data: sinistreResponse, isLoading: loadingDetail } = useDetailSinistre(numeroSinistre!);
  const { updateSinistre, isUpdating } = useUpdateSinistre();
console.log(sinistreResponse)
  const handleSubmit = (formData: Partial<Sinistre>) => {
    if (!numeroSinistre) return;
    
    updateSinistre(numeroSinistre, formData)
      .then(() => {
        navigate(`/sinistre/detail/${numeroSinistre}`);
      })
      .catch(() => {
        // Les erreurs sont déjà gérées par le hook
      });
  };

  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column" _focus={{ outline: "none" }}>
      <Navbar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">
          {loadingDetail ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : sinistreResponse?.data ? (
            <SinistreForm
              initialData={sinistreResponse.data}
              onSubmit={handleSubmit}
              isLoading={isUpdating}
              title="Modification d'un sinistre"
              isUpdate
            />
          ) : (
            <Box color={textColor} textAlign="center" mt={10}>
              Sinistre non trouvé.
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default SinistreUpdatePage;