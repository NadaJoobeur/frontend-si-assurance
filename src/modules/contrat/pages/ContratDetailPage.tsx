import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Badge,
  Stack,
  Divider,
  useDisclosure,
  IconButton,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent ,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button ,
  useToast,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon,DeleteIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDetailContrat } from '../hooks/useDetailContrat';
import { formatDate } from '../../../shared/utils/dateUtils';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { useDeleteContrat } from '../hooks/useDeleteContrat';
import { FaBolt, FaCalendarAlt, FaCar, FaHashtag, FaLayerGroup, FaMoneyBillWave, FaTag, FaTools, FaUserCheck, FaWeightHanging } from 'react-icons/fa';

const ContratDetailPage = () => {
  const { numeroContrat } = useParams<{ numeroContrat: string }>();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: DeleteContrat } = useDeleteContrat();

  const { data: contratData, isLoading, isError, error } = useDetailContrat(numeroContrat || '');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text color="red.500">Erreur: {error?.message}</Text>
      </Flex>
    );
  }

  const { contrat, garanties, profilVehicule,pack } = contratData?.data || {};
  const vehiculeData = Array.isArray(profilVehicule) ? profilVehicule[0] : profilVehicule;

  if (!contrat) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Contrat non trouvé</Text>
      </Flex>
    );
  }
 const handleDelete = () => {
    setIsDeleting(true);
    if (numeroContrat) {
       DeleteContrat( numeroContrat );
      toast({
        title: 'Succès',
        description: 'Personne supprimée.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate(`/contrat/list`);
    } else {
      toast({
        title: 'Erreur',
        description: 'Identifiant invalide.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setIsDeleting(false);
    }
  };
  return (
    <Flex minH="100vh"   _focus={{ outline: "none" }}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        {/* Contenu principal */}
        <Box flex="1" p={{ base: 4, md: 8 }} w="full" maxW="none" mx="auto">
          {/* Header avec bouton retour */}
         

          {/* Carte principale - Version agrandie */}
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            boxShadow="md" 
            p={{ base: 2, md: 4 }}  // Plus de padding
            mb={2}
            w="full"  // Prend toute la largeur disponible
            minH="70vh"  // Hauteur minimale importante
          >
             <Flex align="center" mb={2} gap={2}>
            <IconButton
              aria-label="Retour"
              icon={<ChevronLeftIcon />}
              onClick={() => navigate(-1)}
            />
            <Heading size="lg" flex={1}>Détails du Contrat #{contrat.numeroContrat}</Heading>
              <Badge
                colorScheme={contrat.statutContrat === 'ACTIF' ? 'green' : 'red'}
                px={2}  // Padding horizontal augmenté
                py={1}  // Padding vertical augmenté
                borderRadius="full"
                fontSize="md"  // Taille de police augmentée
              >
                {contrat.statutContrat}
              </Badge>
                {/* Nouveau bouton pour convertir en contrat */}

            <IconButton
            aria-label="Modifier"
            colorScheme="teal"
            variant="solid"
            size="md"
            boxShadow="md"
            _hover={{ bg: 'teal.600', transform: 'translateY(-2px)' }}
            _active={{ bg: 'teal.700' }}
            icon={<EditIcon />}
            onClick={() => navigate(`/contrat/edit/${contrat.numeroContrat}`)}
          >
          </IconButton>
           <IconButton
            aria-label="Supprimer"
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="solid"
            onClick={onOpen}
            size="md"
            boxShadow="md"
                              _hover={{ bg: 'red.600' }}
                            />
       
          </Flex>
            {/* En-tête avec statut */}
            <Flex justify="flex-end" mb={2}>  
           
            </Flex>

            {/* Informations principales - Espacement augmenté */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3} mb={5}>  
              <InfoItem label="Numéro Identification" value={`${contrat.numeroIdentification}`} />
              <InfoItem label="Branche" value={`${contrat.branche} (${contrat.codeBranche})`} />
              <InfoItem label="Offre Commerciale" value={contrat.offreCommerciale} />
              <InfoItem label="Agence" value={`${contrat.libelleAgence} (${contrat.codeAgence})`} />
              <InfoItem label="Date d'effet" value={formatDate(contrat.dateEffet)} />
              <InfoItem label="Date d'expiration" value={formatDate(contrat.dateExpiration)} />
              <InfoItem label="Nature" value={contrat.nature} />
              <InfoItem label="Prime annuelle" value={`${contrat.primeAnnuelle} €`} />
              <InfoItem label="Échéance" value={`${contrat.echeanceContractuelle} `} />
              <InfoItem label="Code Agence" value={`${contrat.codeAgence} `} />
              <InfoItem label="Libellé Agence" value={`${contrat.libelleAgence} `} />
              <InfoItem label="Fractionnement" value={contrat.fractionnement} />
              <InfoItem label="Pack" value={pack?.codePack} />
              <InfoItem
                label="Souscripteur"
                value={contrat.indicateurSouscripteur ? 'Oui' : 'Non'}
              />
            </SimpleGrid>

            <Divider borderColor={dividerColor} my={5} borderWidth="2px" /> 

            {/* Onglets Profil Véhicule / Garanties */}
          <Tabs variant="enclosed" colorScheme="blue" size="lg">
  <TabList>
    {contrat.id_devis && <Tab fontSize="md">Devis</Tab>}
    <Tab fontSize="md">Profil Véhicule</Tab>
    <Tab fontSize="md">Garanties ({garanties?.length || 0})</Tab>
  </TabList>

  <TabPanels mt={4}>
    {contrat.id_devis && (
    <TabPanel>
  <Box
    p={6}
    borderWidth="2px"
    borderRadius="lg"
    borderColor={dividerColor}
    bg="gray.50"
    boxShadow="md"
  >
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Informations du devis
        </Text>
        <InfoItem label="ID du devis" value={contrat.id_devis} />
      </Box>

      <Box textAlign={{ base: "left", md: "right" }}>
        <Link to={`/devis/detail/${contrat.id_devis}`}>
          <Button colorScheme="blue" variant="solid">
            Consulter le devis
          </Button>
        </Link>
      </Box>
    </SimpleGrid>
  </Box>
</TabPanel>

    )}              
                {/* Profil Véhicule */}
       <TabPanel>
         {profilVehicule ? (
           <Box          p={6}
           borderWidth="2px"
           borderRadius="lg"
           borderColor={dividerColor}
           bg="gray.50"
           boxShadow="md">
       
             <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
       
               {/* Immatriculation & identification */}
               <InfoItem1 label="Immatriculation" value={vehiculeData.numeroImmatriculation} icon={<FaCar />} />
               <InfoItem1 label="Numéro de série" value={vehiculeData.numeroSerie} icon={<FaHashtag />} />
               <InfoItem1 label="Marque" value={vehiculeData.marque} icon={<FaTools />} />
               <InfoItem1 label="Constructeur" value={vehiculeData.constructeur} icon={<FaTools />} />
       
               {/* Type & nature */}
               <InfoItem1 label="Type" value={vehiculeData.typeVehicule}  icon={<FaTag />}/>
               <InfoItem1 label="Nature" value={vehiculeData.natureVehicule} icon={<FaLayerGroup/>} />
       
               {/* Dates importantes */}
               <InfoItem1 label="Date 1ère mise en circulation" value={formatDate(vehiculeData.datePremiereMise)} icon={<FaCalendarAlt />} />
               <InfoItem1 label="Date obtention permis" value={formatDate(vehiculeData.dateObtentionPermis)} icon={<FaCalendarAlt />} />
       
               {/* Capacités & poids */}
               <InfoItem1 label="Charge utile" value={`${vehiculeData.ChargeUtile} kg`} icon={<FaWeightHanging />} />
               <InfoItem1 label="Poids total en charge" value={`${vehiculeData.poidsTotalEnCharge} kg`} icon={<FaWeightHanging />} />
               <InfoItem1 label="Nombre de places" value={vehiculeData.nombreDePlaces} icon={<FaUserCheck/>} />
       
               {/* Performances & valeurs */}
               <InfoItem1 label="Puissance fiscale" value={`${vehiculeData.puissanceFiscale} CV `} icon={<FaBolt/>}/>
               <InfoItem1 label="Valeur vénale" value={`${vehiculeData.valeurVenale} dt`} icon={<FaMoneyBillWave/>}/>
               <InfoItem1 label="Bonus/Malus" value={vehiculeData.bonusMalus} icon={<FaHashtag/>}/>
       
             </SimpleGrid>
           </Box>
         ) : (
           <Text fontSize="md" color="gray.500" mt={4}>
             Aucune information véhicule disponible.
           </Text>
         )}
       </TabPanel>
                {/* Garanties */}
                <TabPanel>
                  {garanties && garanties.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>  
                      {garanties.map((garantie, index) => (
                        <Box
                          key={`${garantie.codeGarantie}-${index}`}
                          p={6}
           borderWidth="2px"
           borderRadius="lg"
           borderColor={dividerColor}
           bg="gray.50"
           boxShadow="md"
                          _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }} 
                        >
                          <Flex justify="space-between" mb={4}> 
                            <Text fontSize="lg" fontWeight="bold">{garantie.libelleGarantie}</Text>
                            <Tag colorScheme="blue" size="md">  
                              <TagLabel>{garantie.codeGarantie}</TagLabel>
                            </Tag>
                          </Flex>
                          <Stack spacing={3}> 
                            {garantie.capitalAssure && (
                              <Text fontSize="md">Capital: {garantie.capitalAssure} €</Text>  
                            )}
                            {garantie.franchise && (
                              <Text fontSize="md">Franchise: {garantie.franchise} €</Text>
                            )}
                            {garantie.rangAffichage !== undefined && (
                              <Text fontSize="md" color="gray.500">Rang: {garantie.rangAffichage}</Text>
                            )}
                          </Stack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Text fontSize="lg" color="gray.500" mt={4}>Aucune garantie associée à ce contrat</Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        {/* Footer */}
        <Box borderTop="2px solid" borderColor={borderColor}>
          <Footer />
        </Box>


         <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent rounded="2xl" boxShadow="xl">
                  <ModalHeader>Confirmer la suppression</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontSize="lg">
                      Êtes-vous sûr de vouloir supprimer le contrat numero {' '}
                      <Box as="span" fontWeight="bold">
                        contrat.numeroContrat
                      </Box>
                      ? Cette action est irréversible.
                    </Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isDeleting}>
                      Annuler
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting}>
                      Supprimer
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
      </Box>
    </Flex>
  );
};
const InfoItem1 = ({ label, value, icon }: { label: string; value: string | number|null|undefined; icon?: React.ReactElement }) => (
  <HStack spacing={3} p={3} bg="gray.50" borderRadius="md" boxShadow="sm" minW="200px">
    {icon && <Box color="blue.500">{icon}</Box>}
    <VStack spacing={0} align="start">
      <Text fontWeight="semibold" fontSize="sm" color="gray.600">{label}</Text>
      <Text fontSize="md" fontWeight="medium" color="gray.800">{value || 'N/A'}</Text>
    </VStack>
  </HStack>
)

// Version agrandie du composant InfoItem
const InfoItem = ({ label, value }: { label: string; value?: string | number | null }) => (
  <Box mb={4}>  
    <Text fontSize="md" color="gray.500" mb={2}>{label}</Text>  
    <Text fontSize="lg" fontWeight="medium">{value ?? '-'}</Text>  
  </Box>
);

export default ContratDetailPage;

