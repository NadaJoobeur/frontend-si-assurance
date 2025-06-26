import React from 'react'
import {
  Box,
  Container,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useCreateContrat } from '../hooks/useCreateContrat'
import { ContratForm } from '../components/ContratForm'
import Navbar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'
import type { NouveauContratPayload } from '../types/Contrat'

const CreateContratPage = () => {
  const navigate = useNavigate()
  
  const { mutate: createContrat, isPending } = useCreateContrat();


  const handleSubmit = (formData: NouveauContratPayload) => {
    createContrat(formData, {
      onSuccess: () => {
        navigate('/contrat/list') // ✅ redirection après succès
      },
    })
  }

  const pageBg = useColorModeValue('gray.50', 'gray.900')

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Navbar />

      <Box flex="1" py={{ base: 8, md: 12 }} 
        _focus={{ outline: "none" }}
>
        <Container maxW="container.md">
          {isPending ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <ContratForm
              onSubmit={handleSubmit}
              isLoading={isPending}
              title="Création d'un nouveau contrat"
              isUpdate={false}
            />
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default CreateContratPage
