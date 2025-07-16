// src/modules/agence/pages/AgenceUpdatePage.tsx
import {
  Box,
  Container,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateAgence } from '../hooks/useUpdateAgence';
import { useAgenceDetail } from '../hooks/useAgenceDetail';
import { AgenceForm } from '../components/AgenceForm';
import type { Agence } from '../types/Agence';
import Navbar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

const AgenceUpdatePage = () => {
  const { code_agence } = useParams<{ code_agence: string }>();
  const navigate = useNavigate();

  const { data, isLoading: loadingDetail } = useAgenceDetail(code_agence!);
const { updateAgence, isUpdating} = useUpdateAgence();

const handleSubmit = (formData: Partial<Agence>) => {
  if (!code_agence) return;
  
  updateAgence(code_agence, formData)
    .then(() => {
      navigate(`/agences/detail/${code_agence}`);
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
          ) : data ? (
            <AgenceForm
              initialData={data} // Accès à la propriété data de la réponse
              onSubmit={handleSubmit}
              isLoading={isUpdating}
              title="Modification d'une agence"
              isUpdate
            />
          ) : (
            <Box color={textColor} textAlign="center" mt={10}>
              Agence non trouvée.
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default AgenceUpdatePage;