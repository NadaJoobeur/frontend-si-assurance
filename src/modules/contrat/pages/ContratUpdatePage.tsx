import {
  Box,
  Container,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateContrat } from '../hooks/useUpdateContrat'
import { useDetailContrat } from '../hooks/useDetailContrat'
import { ContratForm } from '../components/ContratForm'
import type { ContratFormData } from '../types/Contrat'

import Navbar from '../../../shared/components/Sidebar'
import Footer from '../../../shared/components/Footer'

const ContratUpdatePage = () => {
  const { numeroContrat } = useParams<{ numeroContrat: string }>()
  const navigate = useNavigate()

  const { data, isLoading: loadingDetail } = useDetailContrat(numeroContrat!)
console.log('data', data?.data)
  const updateMutation = useUpdateContrat()

  const handleSubmit = (formData: {
    contrat: ContratFormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    garanties: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profilVehicule: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pack: any
  }) => {
    updateMutation
      .updateContrat(numeroContrat!, formData)
      .then((success) => {
        if (success) navigate(`/contrat/detail/${numeroContrat}`)
      })
  }

  const pageBg = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box minH="100vh" bg={pageBg} display="flex" flexDirection="column"   _focus={{ outline: "none" }}
>
      <Navbar />

      <Box flex="1" py={{ base: 8, md: 12 }}>
        <Container maxW="container.md">
          {loadingDetail ? (
            <Flex justify="center" align="center" minH="200px">
              <Spinner size="xl" />
            </Flex>
          ) : data?.data ? (
            <ContratForm
              initialData={data.data}
              onSubmit={handleSubmit}
              isLoading={updateMutation.isUpdating}
              title="Modification d'un contrat"
              isUpdate
            />
          ) : (
            <Box color={textColor} textAlign="center" mt={10}>
              Contrat non trouvé.
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default ContratUpdatePage
