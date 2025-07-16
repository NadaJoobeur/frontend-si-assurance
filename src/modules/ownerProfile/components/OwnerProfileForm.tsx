import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
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
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../shared/components/Footer'
import Sidebar from '../../../shared/components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '../../../shared/api/axiosClient'

import {
  getPreviewUrl,
  setPreviewUrl as setPreviewUrlGlobal,
} from '../../../shared/store/previewStore'

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
  id: number
  userId: string
  phoneNumber: string
  department: string
  employeeId: string
  profileImage: string
  poste: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OwnerProfileForm: React.FC<OwnerProfileFormProps> = ({ profile, onSave }) => {
  const navigate = useNavigate()
  const bg = useColorModeValue('gray.50', 'gray.900')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const idUser = localStorage.getItem('idUser')
  const [fullName, setFullName] = useState(localStorage.getItem('username') || '')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '')
  const [position, setPosition] = useState(profile.position || '')
  const [department, setDepartment] = useState(profile.department || '')
  const [employeeId, setEmployeeId] = useState(profile.employeeId || '')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(getPreviewUrl())

  const { data } = useQuery<User, Error>({
    queryKey: ['userEmail', idUser],
    queryFn: async (): Promise<User> => {
      const res = await axiosClient.get(`/profil/users/${idUser}`)
      return res.data
    },
    enabled: !!idUser,
  })

  useEffect(() => {
    if (data) setEmail(data.email)
  }, [data])

  const { data: profilData } = useQuery<Profil, Error>({
    queryKey: ['profil', idUser],
    queryFn: async (): Promise<Profil> => {
      const res = await axiosClient.get(`/profil/recuperer/${idUser}`)
      return res.data
    },
    enabled: !!idUser,
  })

  useEffect(() => {
    if (profilData) {
      setPhoneNumber(profilData.phoneNumber || '')
      setDepartment(profilData.department || '')
      setEmployeeId(profilData.employeeId || '')
      setPosition(profilData.poste || '')

      if (profilData.profileImage) {
        const imageUrl = `http://localhost:3000${profilData.profileImage}`
        setPreviewUrl(imageUrl)
        setPreviewUrlGlobal(imageUrl)
      }
    }
  }, [profilData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setProfileImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        setPreviewUrlGlobal(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password && password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.')
      return
    }

    const formData = new FormData()
    formData.append('userId', idUser || '')
    formData.append('phoneNumber', phoneNumber)
    formData.append('department', department)
    formData.append('employeeId', employeeId)
    formData.append('poste', position)
    if (profileImage) formData.append('profileImage', profileImage)

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axiosClient.post('/profil/creer/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      alert('Profil sauvegardé avec succès !')
      navigate('/homePage')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Erreur lors de la sauvegarde.')
    }
  }

  const handleBack = () => navigate(-1)

  return (
    <Flex minH="100vh" bg={bg}>
      <Sidebar />
      <Flex flex="1" flexDirection="column" ml={{ base: 0, md: 60 }}>
        <Box flex="1" p={{ base: 4, md: 8 }} w="full" maxW="100%">
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 6, md: 10 }}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <HStack mb={8} spacing={4} align="center">
              <IconButton
                aria-label="Retour"
                icon={<ArrowBackIcon />}
                variant="ghost"
                size="md"
                onClick={handleBack}
              />
              <Heading size="lg">Mon Profil</Heading>
            </HStack>

            <Center mb={6}>
              <VStack spacing={2}>
                <Avatar size="2xl" name={fullName} src={previewUrl || undefined} />
                <Text fontSize="lg" fontWeight="bold">
                  {fullName || 'Nom Utilisateur'}
                </Text>
              </VStack>
            </Center>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Nom complet</FormLabel>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl>
                  <FormLabel>Téléphone</FormLabel>
                  <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel>Poste</FormLabel>
                    <Input value={position} onChange={(e) => setPosition(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Département</FormLabel>
                    <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Matricule Employé</FormLabel>
                  <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                </FormControl>

                <FormControl>
                  <FormLabel>Importer une image (logo)</FormLabel>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>

                <Flex justify="flex-end">
                  <Button type="submit" colorScheme="blue" px={8}>
                    Enregistrer
                  </Button>
                </Flex>
              </VStack>
            </form>
          </Box>
        </Box>
        <Footer />
      </Flex>
    </Flex>
  )
}

export default OwnerProfileForm
