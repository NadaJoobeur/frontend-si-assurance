import {
  Box,
  Container,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdatePersonne } from '../hooks/useUpdatePersonne '
import { useDetailPersonne } from '../hooks/usePersonne'
import PersonneForm from '../components/PersonneForm'
import type { Personne } from '../types/personne'

import Navbar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'

const PersonneEditPage = () => {
  const { numeroIdentification } = useParams()
  const navigate = useNavigate()

  const { data, isLoading: loadingDetail } = useDetailPersonne(numeroIdentification!)
  const updateMutation = useUpdatePersonne()

  const handleSubmit = (formData: Partial<Personne>) => {
    updateMutation.mutate(
      { numeroIdentification: numeroIdentification!, data: formData },
      { onSuccess: () => navigate('/person/list') }
    )
  }

  const pageBg = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column">
      <Navbar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">

          {loadingDetail ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : data ? (
         <PersonneForm
  initialData={data}
  onSubmit={handleSubmit}
  isLoading={updateMutation.isPending}
  title="Modification d'une personne" // Ajoutez cette ligne
/>
          ) : (
            <Box color={textColor} textAlign="center" mt={10}>
              Personne non trouvée.
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default PersonneEditPage
