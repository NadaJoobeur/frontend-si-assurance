import React, { useState } from 'react'
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  SimpleGrid,
  Avatar,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

import Sidebar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'
import { useQuery } from '@tanstack/react-query'
import type{ UseQueryOptions } from '@tanstack/react-query'
import axiosClient from '../../../shared/api/axiosClient'




export interface OwnerProfile {
  fullName: string
  email: string
  phoneNumber?: string
  position?: string
  department?: string
  employeeId?: string
  password?: string
  confirmPassword?: string
  profileImage?: File | null
}

interface OwnerProfileFormProps {
  profile: OwnerProfile
  onSave: (data: OwnerProfile) => void
}

interface User {
  id: number
  name: string
  email: string
}
interface Profil {
    id: number;
    userId: string;
    phoneNumber: string;
    department: string;
    employeeId: string;
    profileImage: string; // chemin stocké dans la DB
    poste: string;
  }

const OwnerProfileForm: React.FC<OwnerProfileFormProps> = ({ profile, onSave }) => {
  const navigate = useNavigate()

  const bg = useColorModeValue('gray.50', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // ✅ Nom depuis localStorage
  const [fullName, setFullName] = useState(localStorage.getItem('username') || '')

  // ✅ Email à remplir depuis le backend
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '')
  const [position, setPosition] = useState(profile.position || '')
  const [department, setDepartment] = useState(profile.department || '')
  const [employeeId, setEmployeeId] = useState(profile.employeeId || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const idUser = localStorage.getItem('idUser')




  const { data } = useQuery<User, Error>({
  queryKey: ['userEmail', idUser],
  queryFn: async (): Promise<User> => {
    const res = await axiosClient.get(`/profil/users/${idUser}`)
    return res.data as User
  },
  enabled: !!idUser,
  })

  React.useEffect(() => {
    if (data) {
      setEmail(data.email)
    }
  }, [data])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setProfileImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

 
  // ✅ Nouveau : Récupérer les infos Profil (téléphone, dept, matricule, image)
  const { data: profilData } = useQuery<Profil, Error>({
    queryKey: ['profil', idUser],
    queryFn: async (): Promise<Profil> => {
      const res = await axiosClient.get(`/profil/recuperer/${idUser}`);
      return res.data as Profil;
    },
    enabled: !!idUser,
  });

  React.useEffect(() => {
  if (profilData) {
    setPhoneNumber(profilData.phoneNumber || '');
    setDepartment(profilData.department || '');
    setEmployeeId(profilData.employeeId || '');
    setPosition(profilData.poste || '');
    // ✅ Prévisualiser l'image si elle existe
    if (profilData.profileImage) {
      setPreviewUrl(`http://localhost:3000${profilData.profileImage}`);
    }
  }
}, [profilData]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password && password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  const formData = new FormData();
  formData.append('userId', idUser || '');
  formData.append('phoneNumber', phoneNumber);
  formData.append('department', department);
  formData.append('employeeId', employeeId);
  formData.append('poste', position); // ✅ AJOUT ICI
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  try {
    const res = await axiosClient.post('/profil/creer/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Profil sauvegardé :', res.data);
    alert('Profil sauvegardé avec succès !');
    navigate('/homePage');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du profil :', error);
    alert('Erreur lors de la sauvegarde.');
  }
};



  const handleBack = () => {
    navigate('/homePage')
  }

  return (
    <Flex minH="100vh">
      <Sidebar />

      <Flex flex="1" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 4, md: 8 }} bg={bg} w="full" maxW="100%">
          <Box
            bg={cardBg}
            borderRadius="lg"
            boxShadow="md"
            p={{ base: 4, md: 8 }}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <HStack mb={6} spacing={4} align="center">
              <IconButton
                aria-label="Retour"
                icon={<ArrowBackIcon />}
                size="sm"
                variant="ghost"
                onClick={handleBack}
              />
              <Avatar size="lg" src={previewUrl || undefined} name={fullName} />
              <Heading size="lg">{fullName || 'Nom Utilisateur'}</Heading>
            </HStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl id="fullName" isRequired>
                  <FormLabel>Nom complet</FormLabel>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="phoneNumber">
                  <FormLabel>Téléphone</FormLabel>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="position">
                    <FormLabel>Poste</FormLabel>
                    <Input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </FormControl>

                  <FormControl id="department">
                    <FormLabel>Département</FormLabel>
                    <Input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl id="employeeId">
                  <FormLabel>Matricule Employé</FormLabel>
                  <Input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  />
                </FormControl>

                <FormControl id="profileImage">
                  <FormLabel>Importer une image (logo)</FormLabel>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>

                <Button type="submit" colorScheme="blue" w="fit-content">
                  Enregistrer
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>

        
      </Flex>
    </Flex>
  )
}

export default OwnerProfileForm
