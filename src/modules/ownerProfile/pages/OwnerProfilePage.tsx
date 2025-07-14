import React from 'react'
import { Box } from '@chakra-ui/react'
import OwnerProfileForm from '../components/OwnerProfileForm'
import type { OwnerProfile } from '../types/OwnerProfile'

const OwnerProfilePage = () => {
  // On ne passe plus de `mockProfile`
  const profile: OwnerProfile = {
    fullName: '',  // sera pris depuis localStorage dans le form
    email: '',     // sera chargé via useQuery
    phoneNumber: '',
    position: '',
    department: '',
    employeeId: '',
  }

  return (
    <Box p={10}>
      <OwnerProfileForm
        profile={profile}
        onSave={(data) => console.log('✅ Profil sauvegardé :', data)}
      />
    </Box>
  )
}

export default OwnerProfilePage
