import {
  Box,
  Container,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateDevis } from '../hooks/useUpdateDevis';
import { useDetailDevis } from '../hooks/useDetailDevis';
import { DevisForm } from '../components/DevisForm';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import type { NouveauDevisPayload } from '../types/Devis';

const DevisUpdatePage = () => {
  const { id_devis } = useParams<{ id_devis: string }>();
  const navigate = useNavigate();

  const { data, isLoading: loadingDetail } = useDetailDevis(Number(id_devis));
  const { updateDevis, isUpdating } = useUpdateDevis();

const handleSubmit = (formData: NouveauDevisPayload) => {
  updateDevis(
    { 
      id_devis: Number(id_devis), 
      data: {
        devis: formData.devis,
        garanties: formData.garanties,
        profilVehicule: formData.profilVehicule,
        pack: formData.pack
      }
    },
    {
      onSuccess: (success) => {
        if (success) {
          navigate(`/devis/detail/${id_devis}`);
        }
      },
      onError: (error) => {
        // Gestion supplémentaire des erreurs si nécessaire
        console.error("Erreur lors de la mise à jour:", error);
      }
    }
  );
};

  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column" _focus={{ outline: "none" }}>
      <Sidebar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">
          {loadingDetail ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : data?.data ? (
            <DevisForm
              initialData={{
                devis: data.data.devis,
                garanties: data.data.garanties,
                profilVehicule: data.data.profilVehicule,
                pack:data.data.pack
              }}
              isUpdate={true}
              onSubmit={handleSubmit}
              isLoading={isUpdating}
              title="Modification d'un devis"
            />
          ) : (
            <Box color={textColor} textAlign="center" mt={10}>
              Devis non trouvé.
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default DevisUpdatePage;