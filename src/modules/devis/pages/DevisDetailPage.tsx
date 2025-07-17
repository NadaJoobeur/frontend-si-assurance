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
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Icon,
  Tooltip,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDetailDevis } from '../hooks/useDetailDevis';
import { formatDate } from '../../../shared/utils/dateUtils';
import Sidebar from '../../../shared/components/Sidebar';
import Footer from '../../../shared/components/Footer';
import { useDeleteDevis } from '../hooks/useDeleteDevis';
import { FiCheckCircle,  FiDollarSign, FiFilePlus, FiFileText, FiHash, FiPercent, FiShield } from 'react-icons/fi';

import type { IconType } from 'react-icons/lib';
import { FaBolt, FaCalendarAlt, FaCar, FaHashtag, FaLayerGroup, FaMoneyBillWave, FaTag, FaTools, FaUserCheck, FaWeightHanging } from 'react-icons/fa';
function useDevisColorMode() {
  return {
    bgBl: useColorModeValue('gray.100', 'gray.800'),
    bgCard: useColorModeValue('white', 'gray.800'),
    borderBl: useColorModeValue('gray.300', 'gray.600'),
    textBl: useColorModeValue('gray.800', 'gray.200'),
    cardBg: useColorModeValue('white', 'gray.700'),
    dividerColor: useColorModeValue('gray.200', 'gray.600'),
    borderColor: useColorModeValue('gray.200', 'gray.700'),
  };
}

const DevisDetailPage = () => {
     const {
    bgBl,
    bgCard,
    borderBl,
    textBl,
    cardBg,
    dividerColor,
    borderColor
  } = useDevisColorMode();
  const { id_devis } = useParams<{ id_devis: string }>();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteDevis } = useDeleteDevis();

  const { data: devisData, isLoading, isError, error } = useDetailDevis(Number(id_devis));
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

  const { devis, garanties, profilVehicule, pack, resultat } = devisData?.data || {};
  

  if (!devis) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Devis non trouvé</Text>
      </Flex>
    );
  }

  const handleDelete = async () => {
  if (!id_devis) return;

  setIsDeleting(true);
  
  try {
    await deleteDevis(Number(id_devis));
    toast({
      title: 'Succès',
      description: 'Le devis a été supprimé avec succès',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    navigate('/devis/list');
  } catch  {
    toast({
      title: 'Erreur',
      description: 'La suppression a échoué',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setIsDeleting(false);
  }
};

// Ajoutez cette fonction pour gérer la conversion
const handleConvertToContrat = () => {
navigate(`/devis/to/contrat/${id_devis}`);
};


  return (
    
    <Flex minH="100vh" _focus={{ outline: "none" }}>
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 4, md: 8 }} w="full" maxW="none" mx="auto">
          <Box 
            bg={cardBg} 
            borderRadius="lg" 
            boxShadow="md" 
            p={{ base: 2, md: 4 }}
            mb={2}
            w="full"
            minH="70vh"
          >
            <Flex align="center" mb={2} gap={2}>
              <IconButton
                aria-label="Retour"
                icon={<ChevronLeftIcon />}
                onClick={() => navigate(-1)}
              />
              <Heading size="lg" flex={1}>Détails du Devis #{devis.id}</Heading>
                {/* Bouton de conversion en contrat */}
  {devis.statut === 'VALIDÉ' && (
    <Button
      leftIcon={<FiFilePlus />}
      colorScheme="green"
      onClick={handleConvertToContrat}
      loadingText="Conversion..."
    >
      Convertir en contrat
    </Button>
  )}
              <Badge
                colorScheme={
                  devis.statut === 'VALIDÉ' ? 'green' : 
                  devis.statut === 'EN_ATTENTE' ? 'yellow' : 
                  devis.statut === 'EXPIRÉ' ? 'red' : 'gray'
                }
                px={2}
                py={1}
                borderRadius="full"
                fontSize="md"
              >
                {devis.statut}
              </Badge>
              <IconButton
                aria-label="Modifier"
                colorScheme="teal"
                variant="solid"
                size="md"
                boxShadow="md"
                _hover={{ bg: 'teal.600', transform: 'translateY(-2px)' }}
                _active={{ bg: 'teal.700' }}
                icon={<EditIcon />}
                onClick={() => navigate(`/devis/edit/${devis.id}`)}
              />
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

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3} mb={5}>
              <InfoItem label="Date de création" value={formatDate(devis.dateCreation)} />
              <InfoItem label="Date d'effet" value={formatDate(devis.dateEffet)} />
              <InfoItem label="Date d'expiration" value={formatDate(devis.dateExpiration)} />
              <InfoItem label="Type de fractionnement" value={devis.typeFractionnement} />
              <InfoItem label="Type de renouvellement" value={devis.typeRenouvellement} />
              {pack && <InfoItem label="Pack associé" value={pack.codePack} />}
            </SimpleGrid>

           {/* Résultats financiers - Version améliorée */}
<Box 
  bg={bgBl}
  p={6}
  borderRadius="xl"
  mb={6}
  boxShadow="sm"
  borderWidth="1px"
  borderColor={borderBl}
>
  <Flex justify="space-between" align="center" mb={4}>
    <Heading size="md" color={textBl}>
      <Icon as={FiFileText} mr={2} />
      Détails Financiers du Devis
    </Heading>
    <Badge 
      colorScheme="gray"
      fontSize="md"
      px={3}
      py={1}
      borderRadius="full"
      variant="subtle"
    >
      <Icon as={FiHash} mr={1} />
      Réf. {devis.id}
    </Badge>
  </Flex>

  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
    <FinancialCard 
      title="Primes Assurance"
      icon={FiShield}
      items={[
        { label: "Prime de base", value: resultat?.montantPrimeNette, color: "green" },
        { label: "Commission", value: resultat?.montantComission, color: "gray" }
      ]}
      bg={bgCard}
    />

    <FinancialCard 
      title="Réglementation"
      icon={FiPercent}
      items={[
        { label: "Frais dossier", value: resultat?.montantFrais, color: "orange" },
        { label: "Taxes légales", value: resultat?.montantTaxe, color: "red" }
      ]}
      bg={bgCard}
    />

    <Box 
      bg={bgBl}
      p={4}
      borderRadius="lg"
      borderWidth="2px"
      borderColor={borderBl}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={-2}
        right={-2}
        opacity={0.1}
        fontSize="6xl"
      >
        <Icon as={FiDollarSign} />
      </Box>
      <Heading size="sm" mb={3} color={textBl}>
        <Icon as={FiCheckCircle} mr={2} />
        Montant Total à Payer
      </Heading>
      <Flex direction="column" align="center">
        <Text 
          fontSize="2xl"
          fontWeight="bold"
          mb={2}
          color={textBl}
        >
          {formatTND(resultat?.montantPrimeTotal)}
        </Text>
        <Text fontSize="sm" color={textBl} opacity={0.8}>
          TTC - Validité jusqu'au {formatDate(devis.dateExpiration)}
        </Text>
      </Flex>
    </Box>
  </SimpleGrid>
</Box>


            <Divider borderColor={dividerColor} my={5} borderWidth="2px" />

           <Tabs variant="enclosed" colorScheme="blue" size="lg">
                <TabList>
                    {pack?.numeroContrat?.trim() && (
                    <Tab fontSize="md">Contrat</Tab>
                    )}
                    <Tab fontSize="md">Profil Véhicule</Tab>
                    <Tab fontSize="md">Garanties ({garanties?.length || 0})</Tab>
                </TabList>
                <TabPanels mt={4}>
                        {pack?.numeroContrat?.trim() && (
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
                                    Informations du contrat
                                    </Text>
                                    <InfoItem label="ID du contrat" value={pack.numeroContrat} />
                                </Box>

                                <Box textAlign={{ base: "left", md: "right" }}>
                                    <Link to={`/contrat/detail/${pack.numeroContrat}`}>
                                    <Button colorScheme="blue" variant="solid">
                                        Consulter le contrat
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
    <Box
      p={6}
      borderWidth="2px"
      borderRadius="lg"
      borderColor={dividerColor}
      bg={bgBl}   // ✔️ Utilise le même fond cohérent
      boxShadow="md"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {/* Immatriculation & identification */}
        <InfoItem1 label="Immatriculation" value={profilVehicule.numeroImmatriculation} icon={<FaCar />} />
        <InfoItem1 label="Numéro de série" value={profilVehicule.numeroSerie} icon={<FaHashtag />} />
        <InfoItem1 label="Marque" value={profilVehicule.marque} icon={<FaTools />} />
        <InfoItem1 label="Constructeur" value={profilVehicule.constructeur} icon={<FaTools />} />

        {/* Type & nature */}
        <InfoItem1 label="Type" value={profilVehicule.typeVehicule} icon={<FaTag />} />
        <InfoItem1 label="Nature" value={profilVehicule.natureVehicule} icon={<FaLayerGroup />} />

        {/* Dates importantes */}
        <InfoItem1 label="Date 1ère mise en circulation" value={formatDate(profilVehicule.datePremiereMise)} icon={<FaCalendarAlt />} />
        <InfoItem1 label="Date obtention permis" value={formatDate(profilVehicule.dateObtentionPermis)} icon={<FaCalendarAlt />} />

        {/* Capacités & poids */}
        <InfoItem1 label="Charge utile" value={`${profilVehicule.ChargeUtile} kg`} icon={<FaWeightHanging />} />
        <InfoItem1 label="Poids total en charge" value={`${profilVehicule.poidsTotalEnCharge} kg`} icon={<FaWeightHanging />} />
        <InfoItem1 label="Nombre de places" value={profilVehicule.nombreDePlaces} icon={<FaUserCheck />} />

        {/* Performances & valeurs */}
        <InfoItem1 label="Puissance fiscale" value={`${profilVehicule.puissanceFiscale} CV`} icon={<FaBolt />} />
        <InfoItem1 label="Valeur vénale" value={`${profilVehicule.valeurVenale} dt`} icon={<FaMoneyBillWave />} />
        <InfoItem1 label="Bonus/Malus" value={profilVehicule.bonusMalus} icon={<FaHashtag />} />
      </SimpleGrid>
    </Box>
   ) : (
    <Text fontSize="md" color="gray.500" mt={4}>
      Aucune information véhicule disponible.
    </Text>
  )}
</TabPanel>



                {/* Garanties */}
                {/* ✅ Bloc Garanties refait complet */}
<TabPanel>
  {garanties && garanties.length > 0 ? (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {garanties.map((garantie, index) => (
        <Box
          key={`${garantie.codeGarantie}-${index}`}
          p={6}
          borderWidth="2px"
          borderRadius="lg"
          borderColor={dividerColor}
          bg={useColorModeValue('gray.50', 'gray.700')}
          boxShadow="md"
          transition="all 0.3s ease"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.600'),
            transform: 'scale(1.02)',
            boxShadow: 'lg',
          }}
        >
          <Flex justify="space-between" mb={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'gray.100')}
            >
              {garantie.libelleGarantie}
            </Text>
            <Tag colorScheme="blue" size="md">
              <TagLabel>{garantie.codeGarantie}</TagLabel>
            </Tag>
          </Flex>

          <Stack spacing={3}>
            {garantie.capitalAssure && (
              <Text
                fontSize="md"
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                Capital assuré : {garantie.capitalAssure} €
              </Text>
            )}
            {garantie.franchise && (
              <Text
                fontSize="md"
                color={useColorModeValue('gray.700', 'gray.200')}
              >
                Franchise : {garantie.franchise} €
              </Text>
            )}
            {garantie.rangAffichage !== undefined && (
              <Text
                fontSize="md"
                color={useColorModeValue('gray.500', 'gray.300')}
              >
                Rang : {garantie.rangAffichage}
              </Text>
            )}
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  ) : (
    <Text fontSize="lg" color="gray.500" mt={4}>
      Aucune garantie associée à ce devis.
    </Text>
  )}
</TabPanel>

              </TabPanels>
            </Tabs>
          </Box>
        </Box>

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
                Êtes-vous sûr de vouloir supprimer le devis #{' '}
                <Box as="span" fontWeight="bold">
                  {devis.id}
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

const InfoItem = ({ 
  label, 
  value, 
  fontWeight = 'medium' 
}: { 
  label: string; 
  value?: string | number | null;
  fontWeight?: string;
}) => (
  <Box mb={4}>
    <Text fontSize="md" color="gray.500" mb={2}>{label}</Text>
    <Text fontSize="lg" fontWeight={fontWeight}>{value ?? '-'}</Text>
  </Box>
);
{/* Composants réutilisables améliorés */}
interface FinancialItem {
  label: string;
  value?: number;
  color: string;
  tooltip?: string;
  icon?: IconType;
}

const FinancialCard = ({ 
  title, 
  icon: IconComponent,
  items,
  bg 
}: { 
  title: string;
  icon: IconType;
  items: FinancialItem[];
  bg: string;
}) => (
  <Box 
    bg={bg} 
    p={4} 
    borderRadius="lg" 
    boxShadow="sm"
    borderWidth="1px"
    borderColor={useColorModeValue('gray.200', 'gray.600')}
  >
    <Flex align="center" mb={3}>
      <Icon as={IconComponent} color="blue.500" mr={2} />
      <Heading size="sm" color={useColorModeValue('blue.700', 'blue.300')}>
        {title}
      </Heading>
    </Flex>
    <Stack spacing={3}>
      {items.map((item, index) => (
        <FinancialItem 
          key={index}
          label={item.label} 
          value={item.value} 
          colorScheme={item.color}
          tooltip={item.tooltip}
          icon={item.icon}
        />
      ))}
    </Stack>
  </Box>
);

const FinancialItem = ({ 
  label, 
  value, 
  colorScheme = 'gray',
  tooltip,
  icon: ItemIcon
}: {
  label: string;
  value?: number;
  colorScheme?: string;
  tooltip?: string;
  icon?: IconType;
}) => {
  const content = (
    <Flex justify="space-between" align="center">
      <Flex align="center">
        {ItemIcon && <Icon as={ItemIcon} mr={2} boxSize={4} opacity={0.8} />}
        <Text fontSize="md">{label}</Text>
      </Flex>
      <Badge 
        colorScheme={colorScheme} 
        fontSize="md" 
        px={3} 
        py={1} 
        borderRadius="md"
        variant="subtle"
        minWidth="100px"
        textAlign="right"
      >
        {formatTND(value)}
      </Badge>
    </Flex>
  );

  return tooltip ? (
    <Tooltip label={tooltip} hasArrow placement="top">
      {content}
    </Tooltip>
  ) : content;
};

// Fonction de formatage pour le Dinar Tunisien
const formatTND = (value?: number) => {
  return value?.toLocaleString('fr-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }) ?? '-';
};

export default DevisDetailPage;