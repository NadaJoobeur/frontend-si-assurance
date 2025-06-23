import { Box, Text, Badge, HStack, IconButton, Spacer } from '@chakra-ui/react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import type { Personne } from '../types/personne'

type Props = {
  personne: Personne
  onClick?: () => void
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void 
}

const PersonneItem = ({ personne, onClick, onDelete, onEdit }: Props) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      shadow="sm"
      cursor={onClick ? 'pointer' : 'default'}
      _hover={onClick ? { bg:'blue.100' } : {}}
      onClick={onClick}
      display="flex"
      alignItems="center"
    >
      <Box flex="1">
        <Text fontWeight="bold" fontSize="lg">
          #{personne.id} — {personne.nom} {personne.prenom}
        </Text>

        <Badge colorScheme={personne.blackList ? 'red' : 'green'}>
          {personne.blackList ? 'Black-listé' : 'Non Black-listé'}
        </Badge>
      </Box>

      <Spacer />

      <HStack spacing={2}>
       <IconButton
  aria-label="Modifier"
  icon={<FaEdit />}
  size="sm"
  onClick={(e) => {
    e.stopPropagation()
    if (onEdit) onEdit(personne.id) // ⚠️ change ici
  }}
/>
        <IconButton
          aria-label="Supprimer"
          icon={<FaTrash />}
          size="sm"
          colorScheme="red"
          onClick={(e) => {
            e.stopPropagation()
            if (onDelete) onDelete(personne.id)
          }}
        />
      </HStack>
    </Box>
  )
}

export default PersonneItem
