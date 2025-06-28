import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Grid,
  Heading,
  VStack,
  HStack,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
  Select,
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Personne } from '../types/personne';

interface PersonneFormProps {
  initialData?: Partial<Personne>;
  onSubmit: (data: Partial<Personne>) => void;
  isLoading: boolean;
  title?: string;
}

const PersonneForm = ({ 
  initialData = {}, 
  onSubmit, 
  isLoading,
  title = "Formulaire d'enregistrement"
}: PersonneFormProps) => {
const [formData, setFormData] = useState<Partial<Personne>>({
  ...initialData,
  blackList: initialData.blackList ?? false, 
  listeAdresse: initialData.listeAdresse ?? [{ numRue: undefined, nomRue: '', codePostal: '', contactParDefaut: true }],
  listeTelephone: initialData.listeTelephone ?? [{ numeroTelephone: '', typeTelephone: '', contactParDefaut: true }],
  listeMails: initialData.listeMails ?? [{ adresseMail: '', contactParDefaut: true }],
});

  const toast = useToast();
  const navigate = useNavigate();
  type InputField = Exclude<keyof Personne, 
    'blackList' | 'listeAdresse' | 'listeTelephone' | 'listeMails'
  >;

  const handleChange = (field: InputField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'dateDeNaissance' ? value : value
    }));
  };

  const handleToggle = (field: keyof Personne) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom) {
      toast({
        title: 'Champs requis manquants',
        description: 'Veuillez remplir les champs obligatoires',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      ...initialData,
      listeAdresse: initialData.listeAdresse ?? [{ numRue: undefined, nomRue: '', codePostal: '', contactParDefaut: true }],
      listeTelephone: initialData.listeTelephone ?? [{ numeroTelephone: '', typeTelephone: '', contactParDefaut: true }],
      listeMails: initialData.listeMails ?? [{ adresseMail: '', contactParDefaut: true }],
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
        <Accordion defaultIndex={[0]} allowMultiple>
          {/* Informations de base */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Informations personnelles
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={6}>
                <FormControl isRequired>
                  <FormLabel>Nom</FormLabel>
                  <Input
                    placeholder="Nom"
                    value={String(formData.nom ?? '')}
                    onChange={handleChange('nom')}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Prénom</FormLabel>
                  <Input
                    placeholder="Prénom"
                    value={String(formData.prenom ?? '')}
                    onChange={handleChange('prenom')}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Raison Sociale</FormLabel>
                  <Input
                    placeholder="Raison Sociale"
                    value={String(formData.raisonSociale ?? '')}
                    onChange={handleChange('raisonSociale')}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Date de Naissance</FormLabel>
                  <Input
                    type="date"
                    value={String(formData.dateDeNaissance ?? '')}
                    onChange={handleChange('dateDeNaissance')}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Activité</FormLabel>
                  <Input
                    placeholder="Activité"
                    value={String(formData.activite ?? '')}
                    onChange={handleChange('activite')}
                  />
                </FormControl>
              </Grid>
            </AccordionPanel>
          </AccordionItem>

          {/* Adresses */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Adresses
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="stretch">
                {formData.listeAdresse?.map((adresse, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h4" size="sm" mb={4}>Adresse #{index + 1}</Heading>
                    <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={4}>
                      <FormControl>
                        <FormLabel>Numéro</FormLabel>
                        <Input
                          type="number"
                          placeholder="Numéro"
                          value={adresse.numRue ?? ''}
                          onChange={(e) => {
                            const updated = [...(formData.listeAdresse ?? [])];
                            updated[index].numRue = parseInt(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, listeAdresse: updated }));
                          }}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Rue</FormLabel>
                        <Input
                          placeholder="Rue"
                          value={adresse.nomRue ?? ''}
                          onChange={(e) => {
                            const updated = [...(formData.listeAdresse ?? [])];
                            updated[index].nomRue = e.target.value;
                            setFormData(prev => ({ ...prev, listeAdresse: updated }));
                          }}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Code Postal</FormLabel>
                        <Input
                          placeholder="Code Postal"
                          value={adresse.codePostal ?? ''}
                          onChange={(e) => {
                            const updated = [...(formData.listeAdresse ?? [])];
                            updated[index].codePostal = e.target.value;
                            setFormData(prev => ({ ...prev, listeAdresse: updated }));
                          }}
                        />
                      </FormControl>
                    </Grid>
                    
                    <Checkbox 
                      mt={4}
                      isChecked={adresse.contactParDefaut}
                      onChange={(e) => {
                        const updated = [...(formData.listeAdresse ?? [])];
                        updated[index].contactParDefaut = e.target.checked;
                        setFormData(prev => ({ ...prev, listeAdresse: updated }));
                      }}
                    >
                      Contact par défaut
                    </Checkbox>
                  </Box>
                ))}
                
                <Button 
                  leftIcon={<AddIcon />} 
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      listeAdresse: [...(prev.listeAdresse ?? []), { contactParDefaut: false }]
                    }))}
                >
                  Ajouter une adresse
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Téléphones */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Téléphones
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="stretch">
                {formData.listeTelephone?.map((tel, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h4" size="sm" mb={4}>Téléphone #{index + 1}</Heading>
                    <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={4}>
                      <FormControl>
                        <FormLabel>Numéro</FormLabel>
                        <Input
                          placeholder="Numéro"
                          value={tel.numeroTelephone ?? ''}
                          onChange={(e) => {
                            const updated = [...(formData.listeTelephone ?? [])];
                            updated[index].numeroTelephone = e.target.value;
                            setFormData(prev => ({ ...prev, listeTelephone: updated }));
                          }}
                        />
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select
                          value={tel.typeTelephone ?? ''}
                          onChange={(e) => {
                            const updated = [...(formData.listeTelephone ?? [])];
                            updated[index].typeTelephone = e.target.value;
                            setFormData(prev => ({ ...prev, listeTelephone: updated }));
                          }}
                        >
                          <option value="MOBILE">Mobile</option>
                          <option value="FIXE">Fixe</option>
                          <option value="PROFESSIONNEL">Professionnel</option>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Checkbox 
                      mt={4}
                      isChecked={tel.contactParDefaut}
                      onChange={(e) => {
                        const updated = [...(formData.listeTelephone ?? [])];
                        updated[index].contactParDefaut = e.target.checked;
                        setFormData(prev => ({ ...prev, listeTelephone: updated }));
                      }}
                    >
                      Contact par défaut
                    </Checkbox>
                  </Box>
                ))}
                
                <Button 
                  leftIcon={<AddIcon />} 
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      listeTelephone: [...(prev.listeTelephone ?? []), { contactParDefaut: false }]
                    }))}
                >
                  Ajouter un téléphone
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* Emails */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Emails
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack spacing={4} align="stretch">
                {formData.listeMails?.map((mail, index) => (
                  <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                    <Heading as="h4" size="sm" mb={4}>Email #{index + 1}</Heading>
                    <FormControl>
                      <FormLabel>Adresse Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={mail.adresseMail ?? ''}
                        onChange={(e) => {
                          const updated = [...(formData.listeMails ?? [])];
                          updated[index].adresseMail = e.target.value;
                          setFormData(prev => ({ ...prev, listeMails: updated }));
                        }}
                      />
                    </FormControl>
                    
                    <Checkbox 
                      mt={4}
                      isChecked={mail.contactParDefaut}
                      onChange={(e) => {
                        const updated = [...(formData.listeMails ?? [])];
                        updated[index].contactParDefaut = e.target.checked;
                        setFormData(prev => ({ ...prev, listeMails: updated }));
                      }}
                    >
                      Contact par défaut
                    </Checkbox>
                  </Box>
                ))}
                
                <Button 
                  leftIcon={<AddIcon />} 
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      listeMails: [...(prev.listeMails ?? []), { contactParDefaut: false }]
                    }))}
                >
                  Ajouter un email
                </Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Blacklist */}
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
          <HStack justify="space-between">
            <Box>
              <Heading as="h4" size="sm">Statut blacklist</Heading>
              <Box fontSize="sm" color="gray.500">Marquer cette personne comme indésirable</Box>
            </Box>
            <Checkbox 
              colorScheme="red"
              size="lg"
              isChecked={Boolean(formData.blackList)}
              onChange={handleToggle('blackList')}
            >
              Blacklisté
            </Checkbox>
          </HStack>
        </Box>

        {/* Actions */}
        <HStack justify="flex-end" mt={8} spacing={4}>
          <Button variant="outline" onClick={handleReset}>Réinitialiser</Button>
          <Button colorScheme="blue" type="submit" isLoading={isLoading}>
            Sauvegarder
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default PersonneForm;