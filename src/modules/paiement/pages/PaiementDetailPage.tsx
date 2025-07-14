import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  useToast,
  IconButton,
  Divider,
  useColorModeValue,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import type { Paiement, ListeQuittance } from '../types/paiementTypes';

const PaiementDetailPage = () => {
  const { id } = useParams();
  const [paiement, setPaiement] = useState<Paiement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const fetchPaiement = async () => {
      try {
        const response = await fetch(`/paiements/${id}`);
        if (!response.ok) {
          throw new Error('Paiement non trouvé');
        }
        const data: Paiement = await response.json();
        setPaiement(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        toast({
          title: 'Erreur',
          description: message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaiement();
  }, [id, toast]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="teal.400" />
      </Flex>
    );
  }

  if (!paiement) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          Paiement introuvable.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" _focus={{ outline: "none" }}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 1, md: 8 }} w="full" mx="auto">
          <Box
            bg={cardBg}
            borderRadius="lg"
            boxShadow="md"
            p={{ base: 4, md: 8 }}
            mb={2}
            w="full"
            minH="70vh"
          >
            <Flex align="center" mb={4} gap={2}>
              <IconButton
                aria-label="Retour"
                icon={<ChevronLeftIcon />}
                onClick={() => navigate(-1)}
              />
              <Heading size="lg" flex={1}>
                Détails du Paiement
              </Heading>
            </Flex>

            <Divider borderColor={dividerColor} my={5} borderWidth="2px" />

            <Box borderWidth="1px" borderRadius="lg" p={6} mb={6} borderColor={borderColor}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <VStack spacing={4} align="stretch">
                  <InfoItem label="ID" value={paiement.id} />
                  <InfoItem label="Order ID" value={paiement.orderId} />
                  <InfoItem label="Order Number" value={paiement.orderNumber} />
                </VStack>
                <VStack spacing={4} align="stretch">
                  <InfoItem label="Montant" value={`${paiement.depositAmount} ${paiement.currency}`} />
                  <InfoItem label="Date" value={new Date(paiement.transactionDate).toLocaleDateString()} />
                </VStack>
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" mb={4}>
                Liste des Quittances
              </Heading>

              {paiement.listeQuittances?.length > 0 ? (
                paiement.listeQuittances.map((q: ListeQuittance) => (
                  <Box
                    key={q.numeroQuittance}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                    p={4}
                    mb={4}
                  >
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      <InfoItem label="Numéro Contrat" value={q.numeroContrat} />
                      <InfoItem label="Numéro Quittance" value={q.numeroQuittance} />
                      <InfoItem label="Branche" value={q.codeBranche} />
                      <InfoItem label="Produit" value={q.codeProduit} />
                      <InfoItem label="Client" value={`${q.nomClient} (${q.identifionClient})`} />
                      <InfoItem label="Montant" value={`${q.primeTotal} TND`} />
                    </SimpleGrid>
                  </Box>
                ))
              ) : (
                <Text>Aucune quittance trouvée.</Text>
              )}
            </Box>
          </Box>

          <Box borderTop="2px solid" borderColor={borderColor}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box>
    <Text
      fontSize="sm"
      color="gray.600"
      fontWeight="bold"
      mb={1}
      textTransform="uppercase"
    >
      {label}
    </Text>
    <Text fontSize="md" fontWeight="medium">
      {value || '-'}
    </Text>
  </Box>
);

export default PaiementDetailPage;
