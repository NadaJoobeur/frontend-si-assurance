import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Heading,
  useToast,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type {
  DevisFormData,
  NouveauDevisPayload
} from '../types/Devis';
import type { GarantieContratData, PackData, ProfilVehiculeData } from "../../contrat/types/Contrat";

import { packs, garantiesOptionnelles } from '../../../shared/utils/packs';

const formatLabel = (key: string): string => {
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const initialDevisData: DevisFormData = {
  dateCreation: new Date().toISOString().split('T')[0],
  dateEffet: '',
  dateExpiration: '',
  typeFractionnement: 'MENSUEL',
  typeRenouvellement: 'AUTOMATIQUE',
  statut: 'EN_ATTENTE',
};

const initialGarantieData: GarantieContratData = {
  libelleGarantie: '',
  codeGarantie: '',
  capitalAssure: '',
  franchise: '',
  rangAffichage: 0,
};

const initialVehiculeData: ProfilVehiculeData = {
  numeroImmatriculation: '',
  ChargeUtile: '',
  poidsTotalEnCharge: '',
  nombreDePlaces: '',
  datePremiereMise: '',
  typeVehicule: '',
  natureVehicule: '',
  valeurVenale: '',
  dateObtentionPermis: '',
  numeroSerie: '',
  bonusMalus: '',
  indicSouscObligatoire: '',
  marque: '',
  constructeur: '',
  puissanceFiscale: '',
  valeurCatalogue: '',
};

interface DevisFormProps {
  initialData?: {
    devis: DevisFormData;
    garanties?: GarantieContratData[];
    profilVehicule?: ProfilVehiculeData;
    pack?: PackData;
  };
  onSubmit: (data: NouveauDevisPayload) => void;
  isLoading?: boolean;
  title?: string;
  isUpdate?: boolean;
}

const LabeledInput: React.FC<{
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  isRequired?: boolean;
}> = ({ label, name, value, onChange, type = 'text', isRequired = false }) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input
      name={name}
      value={value ?? ''}
      onChange={onChange}
      type={type}
    />
  </FormControl>
);

export const DevisForm: React.FC<DevisFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  title,
  isUpdate = false,
}) => {
  const [devis, setDevis] = useState<DevisFormData>(
    initialData?.devis ?? initialDevisData
  );
  const [garanties, setGaranties] = useState<GarantieContratData[]>(
    initialData?.garanties ?? [{ ...initialGarantieData }]
  );
  const [profilVehicule, setProfilVehicule] = useState<ProfilVehiculeData>(
    initialData?.profilVehicule ?? initialVehiculeData
  );
  const [selectedPackCode, setSelectedPackCode] = useState<string>(
    initialData?.pack?.codePack ?? ''
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDevisChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDevis(prev => ({ ...prev, [name]: value }));
  };

  const handleVehiculeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfilVehicule(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!devis.dateEffet || !devis.dateExpiration) {
      toast({
        title: 'Champs requis manquants',
        description: 'Veuillez remplir les dates d\'effet et d\'expiration',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (!selectedPackCode) {
      toast({
        title: "Pack non sélectionné",
        description: "Veuillez sélectionner un pack",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isUpdate) {
      const pack: PackData = {
        codePack: selectedPackCode,
        numeroContrat: '',
        id_devis: initialData?.pack?.id_devis ?? 0
      };

      onSubmit({
        devis,
        garanties,
        profilVehicule,
        pack
      });
    } else {
      onOpen();
    }
  };

  const confirmSubmit = () => {
    const pack: PackData = {
      codePack: selectedPackCode,
      numeroContrat: '',
      id_devis: 0
    };

    onSubmit({
      devis,
      garanties,
      profilVehicule,
      pack
    });
    onClose();
  };

  const handleReset = () => {
    setDevis(initialData?.devis ?? initialDevisData);
    setGaranties(initialData?.garanties ?? [{ ...initialGarantieData }]);
    setProfilVehicule(initialData?.profilVehicule ?? initialVehiculeData);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6}>
        <IconButton
          aria-label="Retour"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          mr={2}
        />
        {title || (isUpdate ? "Modification d'un devis" : "Création d'un nouveau devis")}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Accordion defaultIndex={[0]} allowMultiple>
          {/* DEVIS */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                  Devis
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                <LabeledInput 
                  label="Date de création" 
                  name="dateCreation" 
                  value={devis.dateCreation} 
                  onChange={handleDevisChange} 
                  type="date" 
                  isRequired 
                />
                <LabeledInput 
                  label="Date d'effet" 
                  name="dateEffet" 
                  value={devis.dateEffet} 
                  onChange={handleDevisChange} 
                  type="date" 
                  isRequired 
                />
                <LabeledInput 
                  label="Date d'expiration" 
                  name="dateExpiration" 
                  value={devis.dateExpiration} 
                  onChange={handleDevisChange} 
                  type="date" 
                  isRequired 
                />
                <FormControl>
                  <FormLabel>Type de fractionnement</FormLabel>
                  <Select 
                    name="typeFractionnement" 
                    value={devis.typeFractionnement} 
                    onChange={handleDevisChange}
                  >
                    <option value="MENSUEL">Mensuel</option>
                    <option value="TRIMESTRIEL">Trimestriel</option>
                    <option value="SEMESTRIEL">Semestriel</option>
                    <option value="ANNUEL">Annuel</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Type de renouvellement</FormLabel>
                  <Select 
                    name="typeRenouvellement" 
                    value={devis.typeRenouvellement} 
                    onChange={handleDevisChange}
                  >
                    <option value="AUTOMATIQUE">Automatique</option>
                    <option value="MANUEL">Manuel</option>
                  </Select>
                </FormControl>
            
                  <FormControl>
                    <FormLabel>Statut</FormLabel>
                    <Select 
                      name="statut" 
                      value={devis.statut} 
                      onChange={handleDevisChange}
                    >
                      <option value="EN_ATTENTE">En attente</option>
                      <option value="VALIDÉ">Validé</option>
                      <option value="EXPIRÉ">Expiré</option>
                      <option value="ANNULÉ">Annulé</option>
                    </Select>
                  </FormControl>
           
              </Grid>
            </AccordionPanel>
          </AccordionItem>

          {/* GARANTIES */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight="bold">Garanties</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <FormControl mb={4}>
                <FormLabel>Choisir un Pack</FormLabel>
                <Select
                  placeholder="Sélectionnez un pack"
                  onChange={(e) => {
                    const selectedPack = packs.find(p => p.code === e.target.value);
                    if (selectedPack) {
                      setGaranties(
                        selectedPack.garanties.map(g => ({
                          libelleGarantie: g.libelle,
                          codeGarantie: g.code,
                          capitalAssure: g.capital,
                          franchise: g.franchise,
                        }))
                      );
                      setSelectedPackCode(selectedPack.code);
                    }
                  }}
                  value={selectedPackCode}
                >
                  {packs.map((pack) => (
                    <option key={pack.code} value={pack.code}>
                      {pack.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Heading as="h4" size="sm" mb={2}>Garanties optionnelles :</Heading>
              <VStack align="start" spacing={2}>
                {garantiesOptionnelles.map((g, i) => {
                  const isSelected = garanties.some(opt => opt.codeGarantie === g.code);
                  return (
                    <Checkbox
                      key={i}
                      isChecked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGaranties(prev => [
                            ...prev,
                            {
                              libelleGarantie: g.libelle,
                              codeGarantie: g.code,
                              capitalAssure: g.capital,
                              franchise: g.franchise,
                              rangAffichage: g.rang,
                            }
                          ]);
                        } else {
                          setGaranties(prev => prev.filter(opt => opt.codeGarantie !== g.code));
                        }
                      }}
                    >
                      {g.libelle} 
                    </Checkbox>
                  );
                })}
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* VÉHICULE */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                  Véhicule
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                {(Object.keys(initialVehiculeData) as (keyof ProfilVehiculeData)[]).map((key) => (
                  <LabeledInput
                    key={key}
                    label={formatLabel(key)}
                    name={key}
                    value={profilVehicule[key] || ''}
                    onChange={handleVehiculeChange}
                    type={key.toLowerCase().includes('date') ? 'date' : 'text'}
                    isRequired={key === 'valeurVenale' || key === 'bonusMalus' ||key ==='numeroImmatriculation'}  // ✅ seulement pour ces deux

                  />
                ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {devis.statut === 'VALIDÉ' && !isUpdate && (
        <Button 
            colorScheme="green" 
            onClick={() => navigate(`/contrat/from-devis/`)}
            mr={2}
        >
            Créer un contrat à partir de ce devis
        </Button>
        )}
        <HStack justify="flex-end" mt={8} spacing={4}>
          <Button variant="outline" onClick={handleReset}>Réinitialiser</Button>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {isUpdate ? 'Mettre à jour' : 'Créer le devis'}
          </Button>
        </HStack>
      </form>

      {!isUpdate && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Êtes-vous sûr de vouloir créer ce devis ?
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="blue" onClick={confirmSubmit} isLoading={isLoading}>
                Confirmer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};