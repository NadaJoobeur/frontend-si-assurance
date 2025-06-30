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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  IconButton,HStack
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import type { AgenceFormData } from '../types/Agence';

interface LabeledInputProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number' | 'tel' | 'email';
  isRequired?: boolean;
}

const initialAgenceData: AgenceFormData = {
  code_agence: '',
  nom_agence: '',
  ville: '',
  telephone: '',
  email: '',
  statut: 'active',
};

interface AgenceFormProps {
  initialData?: AgenceFormData;
  onSubmit: (data: AgenceFormData) => void;
  isLoading?: boolean;
  title?: string;
  isUpdate?: boolean;
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
      value={value ?? ''}
      onChange={onChange} 
      type={type} 
    />
  </FormControl>
);

export const AgenceForm: React.FC<AgenceFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  title,
  isUpdate = false
}) => {
  const [agence, setAgence] = useState<AgenceFormData>(
    initialData ?? initialAgenceData
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAgence(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agence.code_agence || !agence.nom_agence) {
      toast({
        title: 'Champs requis manquants',
        description: 'Le code et le nom de l\'agence sont obligatoires',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (isUpdate) {
      onSubmit(agence);
    } else {
      onOpen();
    }
  };

  const confirmSubmit = () => {
    onSubmit(agence);
    onClose();
  };

  const handleReset = () => {
    setAgence(initialData ?? initialAgenceData);
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
        {title || (isUpdate ? "Modifier l'agence" : "Créer une nouvelle agence")}
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={6}>
          <LabeledInput 
            label="Code Agence" 
            name="code_agence" 
            value={agence.code_agence} 
            onChange={handleChange} 
            isRequired 
          />
          
          <LabeledInput 
            label="Nom Agence" 
            name="nom_agence" 
            value={agence.nom_agence} 
            onChange={handleChange} 
            isRequired 
          />
          
          <LabeledInput 
            label="Ville" 
            name="ville" 
            value={agence.ville} 
            onChange={handleChange} 
          />
          
          <LabeledInput 
            label="Téléphone" 
            name="telephone" 
            value={agence.telephone} 
            onChange={handleChange} 
            type="tel"
          />
          
          <LabeledInput 
            label="Email" 
            name="email" 
            value={agence.email} 
            onChange={handleChange} 
            type="email"
          />
          
          <FormControl>
            <FormLabel>Statut</FormLabel>
            <Select 
              name="statut" 
              value={agence.statut} 
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">En attente</option>
            </Select>
          </FormControl>
        </Grid>

        <VStack align="flex-end" mt={8} spacing={4}>
          <HStack spacing={4}>
            <Button variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
            <Button 
              type="submit" 
              colorScheme="blue" 
              isLoading={isLoading}
            >
              {isUpdate ? 'Mettre à jour' : 'Créer'}
            </Button>
          </HStack>
        </VStack>
      </form>

      {!isUpdate && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Êtes-vous sûr de vouloir créer cette agence ?
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={confirmSubmit} 
                isLoading={isLoading}
              >
                Confirmer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};