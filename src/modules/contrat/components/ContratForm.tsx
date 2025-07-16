import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
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
  ModalCloseButton,
  GridItem,
  Select,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon
} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type {
  ContratFormData,
  GarantieContratData,
  PackData,
  ProfilVehiculeData
} from '../types/Contrat';
import { packs, garantiesOptionnelles } from '../../../shared/utils/packs';
import { getAgences } from '../../agence/api/AgenceApi'; // adapte le chemin selon ta structure
import type { Agence } from '../../agence/types/Agence';

interface LabeledInputProps {
  label: string;
  name: string;
  value: string | number | undefined; // Ajout de undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'date' | 'checkbox' | 'password' | 'email';
  isRequired?: boolean;
}
const formatLabel = (key: string): string => {
  // Ajoute un espace avant les majuscules et met la première lettre en majuscule
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};


const initialContratData: ContratFormData = {
  numeroContrat: '', branche: '', codeBranche: '', offreCommerciale: '',
  codeOffreCommerciale: '', immatriculation: '', statutContrat: 'ACTIF',
  primeAnnuelle: '', echeanceContractuelle: '', codeAgence: '',
  libelleAgence: '', dateExpiration: '', dateEffet: '',
  fractionnement: 'MENSUEL', nature: 'NOUVEAU',
  indicateurSouscripteur: false, indicateurAssure: false,
  numeroIdentification: '',id_devis:0
};

const initialGarantieData: GarantieContratData = {
  libelleGarantie: '', codeGarantie: '', capitalAssure: '', franchise: '', rangAffichage: 0,
};

const initialVehiculeData: ProfilVehiculeData = {
  numeroImmatriculation: '', ChargeUtile: '', poidsTotalEnCharge: '', nombreDePlaces: '',
  datePremiereMise: '', typeVehicule: '', natureVehicule: '', valeurVenale: '',
  dateObtentionPermis: '', numeroSerie: '', bonusMalus: '', indicSouscObligatoire: '',
  marque: '', constructeur: '', puissanceFiscale: '', valeurCatalogue: '',
};

interface ContratFormProps {
  initialData?: {
    contrat: ContratFormData;
    garanties?: GarantieContratData[];
    profilVehicule?: ProfilVehiculeData;
    pack?: PackData;

  };
onSubmit: (data: {
  contrat: ContratFormData;
  garanties: GarantieContratData[];
  profilVehicule: ProfilVehiculeData;
  pack: PackData; // ou le type exact de ton pack
 }) => void;
  isLoading?: boolean;
  title?: string;
  isUpdate?: boolean;
  isFromDevis?: boolean;

}

const LabeledInput: React.FC<LabeledInputProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  isRequired = false 
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input 
      name={name} 
      value={value ?? ''} // Fournit une chaîne vide si undefined
      onChange={onChange} 
      type={type} 
    />
  </FormControl>
);

export const ContratForm: React.FC<ContratFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  title,
  isUpdate = false
}) => {
  const [contrat, setContrat] = useState<ContratFormData>(
    initialData?.contrat ?? initialContratData
  );
  const [garanties, setGaranties] = useState<GarantieContratData[]>(
    initialData?.garanties ?? [{ ...initialGarantieData }]
  );
  const [profilVehicule, setProfilVehicule] = useState<ProfilVehiculeData>(
    initialData?.profilVehicule ?? initialVehiculeData
  );
const [selectedPackCode, setSelectedPackCode] = useState<string>('');
useEffect(() => {
  if (initialData?.pack?.codePack) {
    setSelectedPackCode(initialData.pack.codePack);
  }
}, [initialData]);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

const handleContratChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  setContrat(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
};

const handleVehiculeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfilVehicule(prev => ({ ...prev, [name]: value }));
  };


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!contrat.numeroContrat || !contrat.branche || !contrat.codeBranche) {
    toast({
      title: 'Champs requis manquants',
      description: 'Veuillez remplir les champs obligatoires du contrat',
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
    const pack = {
      codePack: selectedPackCode,
      numeroContrat: contrat.numeroContrat,
      id_devis:1,
    };
    onSubmit({ contrat, garanties, profilVehicule, pack });
  } else {
    onOpen();
  }
};

const confirmSubmit = () => {
  const pack = {
    codePack: selectedPackCode,
    numeroContrat: contrat.numeroContrat,
     id_devis:1,
  };
  onSubmit({ contrat, garanties, profilVehicule, pack });
  onClose();
};

const handleReset = () => {
  setContrat(initialData?.contrat ?? initialContratData);
  setGaranties(initialData?.garanties ?? [{ ...initialGarantieData }]);
  setProfilVehicule(initialData?.profilVehicule ?? initialVehiculeData);
};
const [agences, setAgences] = useState<Agence[]>([]);

useEffect(() => {
  const fetchAgences = async () => {
    try {
      const data = await getAgences();
      setAgences(data);
    } catch (error) {
      console.error('Erreur lors du chargement des agences', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger la liste des agences.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  fetchAgences();
}, []);

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6}>
        <IconButton
          aria-label="Retour"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          mr={2}
        />
        {title || "Création d'un nouveau contrat"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Accordion defaultIndex={[0]} allowMultiple>
          {/* CONTRAT */}
          <AccordionItem>
            <h2>
              <AccordionButton>
               <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                    Contrat
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                <LabeledInput label="Id client" name="numeroIdentification" value={contrat.numeroIdentification} onChange={handleContratChange} isRequired />
                <LabeledInput label="Numéro Contrat" name="numeroContrat" value={contrat.numeroContrat} onChange={handleContratChange} isRequired />
                <LabeledInput label="Branche" name="branche" value={contrat.branche} onChange={handleContratChange} isRequired />
                <LabeledInput label="Code Branche" name="codeBranche" value={contrat.codeBranche} onChange={handleContratChange} isRequired />
                <LabeledInput label="Offre Commerciale" name="offreCommerciale" value={contrat.offreCommerciale} onChange={handleContratChange} isRequired />
                <LabeledInput label="Immatriculation" name="immatriculation" value={contrat.immatriculation} onChange={handleContratChange} />
                <LabeledInput label="Prime Annuelle" name="primeAnnuelle" value={contrat.primeAnnuelle} onChange={handleContratChange} />
                <LabeledInput label="Échéance" name="echeanceContractuelle" value={contrat.echeanceContractuelle} onChange={handleContratChange} />
                <FormControl >
                <FormLabel>Agence</FormLabel>
                        <Select
                                placeholder="Sélectionner une agence"
                                value={contrat.codeAgence}
                                onChange={(e) => {
                                  const selectedCode = e.target.value;
                                  const selectedAgence = agences.find(a => a.code_agence === selectedCode);

                                  setContrat(prev => ({
                                    ...prev,
                                    codeAgence: selectedCode,
                                    libelleAgence: selectedAgence?.nom_agence || '',
                                  }));
                                }}
                              >
                                {agences.map((agence) => (
                                  <option key={agence.code_agence} value={agence.code_agence}>
                                    {agence.nom_agence} ({agence.code_agence})
                                  </option>
                                ))}
                      </Select>
                  </FormControl>
                <LabeledInput label="Date Expiration" name="dateExpiration" value={contrat.dateExpiration} onChange={handleContratChange} type="date" />
                <LabeledInput label="Date Effet" name="dateEffet" value={contrat.dateEffet} onChange={handleContratChange} type="date" />
              </Grid>
              <GridItem mt={4}>
                <FormControl>
                  <FormLabel>Nature</FormLabel>
                  <Select name="nature" value={contrat.nature} onChange={handleContratChange}>
                    <option value="NOUVEAU">NOUVEAU</option>
                    <option value="RENOUVELLEMENT">RENOUVELLEMENT</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Statut</FormLabel>
                  <Select name="statutContrat" value={contrat.statutContrat} onChange={handleContratChange}>
                    <option value="ACTIF">Actif</option>
                    <option value="RESILIE">Résilié</option>
                    <option value="SUSPENDU">Suspendu</option>
                  </Select>
                </FormControl>
              </GridItem>
              <HStack mt={4} spacing={6}>
                <Checkbox name="indicateurSouscripteur" isChecked={contrat.indicateurSouscripteur} onChange={handleContratChange}>Souscripteur</Checkbox>
                <Checkbox name="indicateurAssure" isChecked={contrat.indicateurAssure} onChange={handleContratChange}>Assuré</Checkbox>
              </HStack>
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
    {/* Sélection du Pack */}
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
    {/* Garanties optionnelles */}
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
                    />
                ))}
                </Grid>
            </AccordionPanel>
            </AccordionItem>
        </Accordion>

        <HStack justify="flex-end" mt={8} spacing={4}>
          <Button variant="outline" onClick={handleReset}>Réinitialiser</Button>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            {isUpdate ? 'Mettre à jour' : 'Créer le contrat'}
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
              Êtes-vous sûr de vouloir créer ce contrat ? Cette action est irréversible.
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>Annuler</Button>
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