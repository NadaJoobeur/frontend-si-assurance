import React from 'react'
import { Badge, Text, Box } from '@chakra-ui/react'

type Props = {
  isBlacklisted: boolean | undefined
}

const BlacklistStatus = ({ isBlacklisted }: Props) => {
  if (isBlacklisted === undefined) return null

  return (
    <Box mt={4}>
      <Text fontWeight="bold" display="inline" mr={2}>
        Statut Blacklisté:
      </Text>
      <Badge colorScheme={isBlacklisted ? 'red' : 'green'}>
        {isBlacklisted ? 'Oui' : 'Non'}
      </Badge>
    </Box>
  )
}

export default BlacklistStatus
