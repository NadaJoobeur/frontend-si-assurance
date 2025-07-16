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
  Textarea,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type { SinistreFormData } from '../types/Sinistre';
import { useCreateSinistre } from '../hooks/useCreateSinistre';

const initialSinistreData: SinistreFormData = {
  numeroContrat: '',
  statut: 'OUVERT',
  dateSinistre: new Date().toISOString().split('T')[0],
  identifiantPrincipal: '',
  OptionReparation: 'Garage Agréé',
};

const LabeledInput: React.FC<{
  label: string;
  name: string;
  value: string | Date | null | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
}> = ({ label, name, value, onChange, type = 'text', isRequired = false, isTextArea = false }) => {
  const InputComponent = isTextArea ? Textarea : Input;
  
  const formatValue = () => {
    if (value === undefined || value === null) return '';
    if (value instanceof Date) return value.toISOString().split('T')[0];
    if (Array.isArray(value)) return value.join(', ');
    return value;
  };

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <InputComponent
        name={name}
        value={formatValue()}
        onChange={onChange}
        type={type}
      />
    </FormControl>
  );
};

type SinistreFormProps = {
  onSubmit: (formData: SinistreFormData) => void;
  isLoading?: boolean;
  title?: string;
  initialData?: Partial<SinistreFormData>;
  isUpdate?: boolean;
};

export const SinistreForm: React.FC<SinistreFormProps> = ({
  onSubmit,
  isLoading = false,
  title = "Déclaration d'un nouveau sinistre",
  initialData,
  isUpdate = false
}) => {
  const [sinistre, setSinistre] = useState<SinistreFormData>({
    ...initialSinistreData,
    ...initialData
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: createSinistre, isPending } = useCreateSinistre();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSinistre(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sinistre.numeroContrat || !sinistre.dateSinistre || !sinistre.identifiantPrincipal) {
      toast({
        title: 'Champs requis manquants',
        description: 'Veuillez remplir tous les champs obligatoires',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    onOpen();
  };

  const confirmSubmit = () => {
    onSubmit(sinistre);
    onClose();
  };

  const handleReset = () => {
    setSinistre({
      ...initialSinistreData,
      ...initialData
    });
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
        {title}
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6} mb={6}>
          <LabeledInput 
            label="Numéro de contrat" 
            name="numeroContrat" 
            value={sinistre.numeroContrat} 
            onChange={handleChange} 
            isRequired 
          />
          
          <LabeledInput 
            label="Date du sinistre" 
            name="dateSinistre" 
            value={sinistre.dateSinistre} 
            onChange={handleChange} 
            type="date" 
            isRequired 
          />
          
          <FormControl isRequired>
            <FormLabel>Statut</FormLabel>
            <Select 
              name="statut" 
              value={sinistre.statut} 
              onChange={handleChange}
            >
              <option value="OUVERT">Ouvert</option>
              <option value="EN_COURS">En cours</option>
              <option value="VALIDÉ">Validé</option>
              <option value="ANNULÉ">Annulé</option>
              <option value="RÉGLÉ">Réglé</option>
            </Select>
          </FormControl>
          
          <FormControl>
            <FormLabel>Option de réparation</FormLabel>
            <Select 
              name="OptionReparation" 
              value={sinistre.OptionReparation} 
              onChange={handleChange}
            >
              <option value="">Sélectionnez une option</option>
              <option value="Garage Agréé">Garage Agréé</option>
              <option value="Remboursement">Remboursement</option>
              <option value="Remorquage">Remorquage</option>
              <option value="Véhicule de remplacement">Véhicule de remplacement</option>
              <option value="Pas de réparation">Pas de réparation</option>
              <option value="Expertise seule">Expertise seule</option>
            </Select>
          </FormControl>
          
          <LabeledInput 
            label="Numéro(s) d'immatriculation (séparés par des virgules)" 
            name="numeroImmatriculation" 
            value={sinistre.numeroImmatriculation} 
            onChange={handleChange} 
          />
          
          <LabeledInput 
            label="Lieu du sinistre" 
            name="lieuSinistre" 
            value={sinistre.lieuSinistre} 
            onChange={handleChange} 
          />
          
          <LabeledInput 
            label="Conducteur" 
            name="conducteur" 
            value={sinistre.conducteur} 
            onChange={handleChange} 
          />
          
          <FormControl>
            <FormLabel>Type de conducteur</FormLabel>
            <Select 
              name="typeConducteur" 
              value={sinistre.typeConducteur} 
              onChange={handleChange}
            >
              <option value="">Sélectionnez un type</option>
              <option value="Assuré">Assuré</option>
              <option value="Conjoint">Conjoint</option>
              <option value="Conducteur occasionnel">Conducteur occasionnel</option>
              <option value="Tiers">Tiers</option>
              <option value="Jeune conducteur">Jeune conducteur</option>
              <option value="Conducteur non assuré">Conducteur non assuré</option>
            </Select>
          </FormControl>
          
          <LabeledInput 
            label="Identifiant principal" 
            name="identifiantPrincipal" 
            value={sinistre.identifiantPrincipal} 
            onChange={handleChange} 
            isRequired 
          />
          
          <LabeledInput 
            label="Motif de rejet (si applicable)" 
            name="motifRejet" 
            value={sinistre.motifRejet} 
            onChange={handleChange} 
            isTextArea 
          />
        </Grid>
        
        <HStack justify="flex-end" mt={8} spacing={4}>
          <Button variant="outline" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button 
            type="submit" 
            colorScheme="blue" 
            isLoading={isLoading || isPending}
          >
            {isUpdate ? "Mettre à jour" : "Déclarer le sinistre"}
          </Button>
        </HStack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Êtes-vous sûr de vouloir {isUpdate ? "mettre à jour" : "déclarer"} ce sinistre ?
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Annuler
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={confirmSubmit} 
              isLoading={isLoading || isPending}
            >
              Confirmer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};