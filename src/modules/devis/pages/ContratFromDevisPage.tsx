import {
  Box,
  Container,
  useToast,
  VStack,
  Spinner,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContratFromDevis } from '../hooks/useContratFromDevis';
import { useDetailDevis } from '../hooks/useDetailDevis';
import { ContratForm } from '../../contrat/components/ContratForm';
import type { ContratFormData, GarantieContratData, PackData, ProfilVehiculeData } from '../../contrat/types/Contrat';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';

export const ContratFromDevisPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: devisData, isLoading, error } = useDetailDevis(id ? parseInt(id) : 0);
  const { createContratFromDevis, isCreating } = useContratFromDevis();

  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const handleSubmit = (formData: {
    contrat: ContratFormData;
    profilVehicule: ProfilVehiculeData;
    garanties: GarantieContratData[];
    pack: PackData;
  }) => {
    if (!devisData || !id) return;

    createContratFromDevis({
      id_devis: parseInt(id),
      contrat: formData.contrat,
      garanties: formData.garanties,
      profilVehicule: formData.profilVehicule,
      pack: {
        ...formData.pack,
        id_devis: parseInt(id),
        numeroContrat: formData.contrat.numeroContrat
      }
    });
  };

  if (isLoading) {
    return (
      <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
        <Sidebar />
        <Flex justify="center" align="center" flex="1">
          <Spinner size="xl" />
        </Flex>
        <Footer />
      </Box>
    );
  }

  if (error) {
    toast({
      title: 'Erreur',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  if (!devisData) {
    return (
      <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
        <Sidebar />
        <Box flex="1" textAlign="center" pt={10} color={textColor}>
          Devis non trouvé
        </Box>
        <Footer />
      </Box>
    );
  }

  if (devisData.data.devis.statut !== 'VALIDÉ') {
    toast({
      title: 'Action impossible',
      description: 'Seuls les devis validés peuvent être convertis en contrat',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
    navigate(`/devis/${id}`);
    return null;
  }

  const initialContratData: ContratFormData = {
    dateEffet: devisData.data.devis.dateEffet,
    dateExpiration: devisData.data.devis.dateExpiration,
    fractionnement: devisData.data.devis.typeFractionnement,
    immatriculation: devisData.data.profilVehicule.numeroImmatriculation || '',
    numeroContrat: '',
    branche: 'AUTO',
    codeBranche: 'A',
    offreCommerciale: '',
    codeOffreCommerciale: '12',
    statutContrat: 'ACTIF',
    primeAnnuelle: '',
    echeanceContractuelle: '',
    codeAgence: '',
    libelleAgence: '',
    nature: 'NOUVEAU',
    indicateurSouscripteur: false,
    indicateurAssure: false,
    numeroIdentification: '',
    id_devis:0
  };

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Sidebar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">
          <VStack spacing={6} align="stretch">
            <ContratForm
              initialData={{
                contrat: initialContratData,
                garanties: devisData.data.garanties,
                profilVehicule: devisData.data.profilVehicule,
                pack: {
                  ...devisData.data.pack,
                  id_devis: parseInt(id || '0'),
                  numeroContrat: ''
                }
              }}
              onSubmit={handleSubmit}
              isLoading={isCreating}
              title={`Création contrat (Devis #${id})`}
              isFromDevis={true}
            />
          </VStack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};