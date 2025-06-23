import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Heading,
  SimpleGrid,
  Switch,
  Flex,
  Collapse,
  IconButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, AddIcon } from '@chakra-ui/icons'
import type { Personne } from '../types/personne'


interface PersonneFormProps {
  initialData?: Partial<Personne>;
  onSubmit: (data: Partial<Personne>) => void;
  isLoading: boolean;
  title?: string; // Ajoutez cette ligne
}

const PersonneForm = ({ 
  initialData = {}, 
  onSubmit, 
  isLoading,
  title = "Formulaire d'enregistrement" // Valeur par défaut
}: PersonneFormProps) => {
  const [formData, setFormData] = useState<Partial<Personne>>({
    ...initialData,
    listeAdresse: initialData.listeAdresse ?? [{ numRue: undefined, nomRue: '', codePostal: '', contactParDefaut: true }],
    listeTelephone: initialData.listeTelephone ?? [{ numeroTelephone: '', typeTelephone: '', contactParDefaut: true }],
    listeMails: initialData.listeMails ?? [{ adresseMail: '', contactParDefaut: true }],
  })

  const { isOpen: showAddress, onToggle: toggleAddress } = useDisclosure({ defaultIsOpen: true })
  const { isOpen: showPhone, onToggle: togglePhone } = useDisclosure({ defaultIsOpen: false })
  const { isOpen: showEmail, onToggle: toggleEmail } = useDisclosure({ defaultIsOpen: false })

const handleChange = (field: InputField) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setFormData(prev => ({
    ...prev,
    [field]: field === 'dateDeNaissance' ? value : value
  }))
}

  const handleToggle = (field: keyof Personne) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData({
      ...initialData,
      listeAdresse: initialData.listeAdresse ?? [{ numRue: undefined, nomRue: '', codePostal: '', contactParDefaut: true }],
      listeTelephone: initialData.listeTelephone ?? [{ numeroTelephone: '', typeTelephone: '', contactParDefaut: true }],
      listeMails: initialData.listeMails ?? [{ adresseMail: '', contactParDefaut: true }],
    })
  }
  type InputField = Exclude<keyof Personne, 
  'blackList' | 'listeAdresse' | 'listeTelephone' | 'listeMails'
>

  const inputBorderColor = useColorModeValue('gray.300', 'gray.600')
  const inputFocusBorderColor = 'teal.400'
  const placeholderColor = useColorModeValue('gray.500', 'gray.400')
  const sectionBg = useColorModeValue('whiteAlpha.700', 'gray.700')

  return (
    <Flex minH="100vh" align="center" justify="center" px={4} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box 
        as="form" 
        onSubmit={handleSubmit} 
        maxW="4xl" 
        w="full" 
        p={8}
        border="1px solid"
        borderColor="blue.300"
        borderRadius="md"
      >
        <Heading size="lg" mb={6} textAlign="center" color={useColorModeValue('gray.800', 'white')}>
        {title}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
     {[
  { label: 'Nom', field: 'nom' as InputField },
  { label: 'Prénom', field: 'prenom' as InputField },
  { label: 'Raison Sociale', field: 'raisonSociale' as InputField },
  { label: 'Date de Naissance', field: 'dateDeNaissance' as InputField, type: 'date' },
  { label: 'Activité', field: 'activite' as InputField },
].map(({ label, field, type }) => (
  <FormControl key={field} isRequired={field !== 'raisonSociale'}>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type ?? 'text'}
      placeholder={label}
      value={String(formData[field] ?? '')}
      onChange={handleChange(field)}
      _placeholder={{ color: placeholderColor }}
      borderColor={inputBorderColor}
      focusBorderColor={inputFocusBorderColor}
      rounded="md"
    />
  </FormControl>
))}
        </SimpleGrid>

        {/* Adresses */}
        <Section title="Adresses" show={showAddress} toggle={toggleAddress}>
          {formData.listeAdresse?.map((adresse, index) => (
            <SimpleGrid key={index} columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
              <FormControl>
                <FormLabel>Numéro</FormLabel>
                <Input
                  type="number"
                  placeholder="Numéro"
                  value={adresse.numRue ?? ''}
                  onChange={(e) => {
                    const updated = [...(formData.listeAdresse ?? [])]
                    updated[index].numRue = parseInt(e.target.value) || 0
                    setFormData(prev => ({ ...prev, listeAdresse: updated }))
                  }}
                  _placeholder={{ color: placeholderColor }}
                  borderColor={inputBorderColor}
                  focusBorderColor={inputFocusBorderColor}
                  rounded="md"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rue</FormLabel>
                <Input
                  placeholder="Rue"
                  value={adresse.nomRue ?? ''}
                  onChange={(e) => {
                    const updated = [...(formData.listeAdresse ?? [])]
                    updated[index].nomRue = e.target.value
                    setFormData(prev => ({ ...prev, listeAdresse: updated }))
                  }}
                  _placeholder={{ color: placeholderColor }}
                  borderColor={inputBorderColor}
                  focusBorderColor={inputFocusBorderColor}
                  rounded="md"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Code Postal</FormLabel>
                <Input
                  placeholder="Code Postal"
                  value={adresse.codePostal ?? ''}
                  onChange={(e) => {
                    const updated = [...(formData.listeAdresse ?? [])]
                    updated[index].codePostal = e.target.value
                    setFormData(prev => ({ ...prev, listeAdresse: updated }))
                  }}
                  _placeholder={{ color: placeholderColor }}
                  borderColor={inputBorderColor}
                  focusBorderColor={inputFocusBorderColor}
                  rounded="md"
                />
              </FormControl>
            </SimpleGrid>
          ))}
          <Button size="sm" variant="outline" leftIcon={<AddIcon />} onClick={() =>
            setFormData(prev => ({
              ...prev,
              listeAdresse: [...(prev.listeAdresse ?? []), { contactParDefaut: false }]
            }))}>
            Ajouter une adresse
          </Button>
        </Section>

        {/* Téléphones */}
        <Section title="Téléphones" show={showPhone} toggle={togglePhone}>
          {formData.listeTelephone?.map((tel, index) => (
            <FormControl key={index} mb={4}>
              <FormLabel>Numéro</FormLabel>
              <Input
                placeholder="Numéro"
                value={tel.numeroTelephone ?? ''}
                onChange={(e) => {
                  const updated = [...(formData.listeTelephone ?? [])]
                  updated[index].numeroTelephone = e.target.value
                  setFormData(prev => ({ ...prev, listeTelephone: updated }))
                }}
                _placeholder={{ color: placeholderColor }}
                borderColor={inputBorderColor}
                focusBorderColor={inputFocusBorderColor}
                rounded="md"
              />
            </FormControl>
          ))}
          <Button size="sm" variant="outline" leftIcon={<AddIcon />} onClick={() =>
            setFormData(prev => ({
              ...prev,
              listeTelephone: [...(prev.listeTelephone ?? []), { contactParDefaut: false }]
            }))}>
            Ajouter un téléphone
          </Button>
        </Section>

        {/* Emails */}
        <Section title="Emails" show={showEmail} toggle={toggleEmail}>
          {formData.listeMails?.map((mail, index) => (
            <FormControl key={index} mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                type="email"
                value={mail.adresseMail ?? ''}
                onChange={(e) => {
                  const updated = [...(formData.listeMails ?? [])]
                  updated[index].adresseMail = e.target.value
                  setFormData(prev => ({ ...prev, listeMails: updated }))
                }}
                _placeholder={{ color: placeholderColor }}
                borderColor={inputBorderColor}
                focusBorderColor={inputFocusBorderColor}
                rounded="md"
              />
            </FormControl>
          ))}
          <Button size="sm" variant="outline" leftIcon={<AddIcon />} onClick={() =>
            setFormData(prev => ({
              ...prev,
              listeMails: [...(prev.listeMails ?? []), { contactParDefaut: false }]
            }))}>
            Ajouter un email
          </Button>
        </Section>

        {/* Blacklist */}
        <Flex align="center" justify="space-between" mt={6} bg={sectionBg} p={4} rounded="md">
          <Box>
            <Text fontWeight="bold">Statut blacklist</Text>
            <Text fontSize="sm" color={placeholderColor}>Marquer cette personne comme indésirable</Text>
          </Box>
          <Switch
            isChecked={Boolean(formData.blackList)}
            onChange={handleToggle('blackList')}
            colorScheme="red"
            size="lg"
          />
        </Flex>

        {/* Actions */}
        <Flex justify="flex-end" gap={4} mt={8}>
          <Button variant="outline" onClick={handleReset}>Réinitialiser</Button>
          <Button colorScheme="teal" type="submit" isLoading={isLoading} loadingText="Enregistrement...">Sauvegarder</Button>
        </Flex>
      </Box>
    </Flex>
  )
}

// Petite section réutilisable
const Section = ({ title, show, toggle, children }: { title: string, show: boolean, toggle: () => void, children: React.ReactNode }) => {
  return (
    <Box mt={4}>
      <Flex justify="space-between" align="center" onClick={toggle} cursor="pointer" mb={2}>
        <Heading size="sm">{title}</Heading>
        <IconButton
          aria-label={show ? `Cacher ${title}` : `Afficher ${title}`}
          icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size="sm"
          variant="ghost"
        />
      </Flex>
      <Collapse in={show}>
        <Box>{children}</Box>
      </Collapse>
    </Box>
  )
}

export default PersonneForm