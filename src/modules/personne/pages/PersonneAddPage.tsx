import {
  Box,
  useColorModeValue,
  Container,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PersonneForm from '../components/PersonneForm'
import { useAddPersonne } from '../hooks/useAddPersonne'
import type { Personne } from '../types/personne'
import { useState, useEffect } from 'react'

import Sidebar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'

const PersonneAddPage = () => {
  const [idUser, setIdUser] = useState('')

// Charger idUser depuis localStorage au montage
useEffect(() => {
  const storedId = localStorage.getItem('idUser')
  if (storedId) {
    setIdUser(storedId)
  }
}, [])
  const navigate = useNavigate()
  const addMutation = useAddPersonne()

  const pageBg = useColorModeValue('gray.50', 'gray.900')
  const handleSubmit = (formData: Partial<Personne>) => {
    const ownerId = idUser
    console.log('📦 Données envoyées au backend :', { ownerId, formData })

    addMutation.mutate(
      {
        ownerId,
        data: formData as Omit<Personne, 'id'>,
      },
      {
        onSuccess: () => navigate('/person/list'),
      }
    )
  }

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Sidebar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">
  

          <PersonneForm
            onSubmit={handleSubmit}
            isLoading={addMutation.isPending}
          />
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default PersonneAddPage
