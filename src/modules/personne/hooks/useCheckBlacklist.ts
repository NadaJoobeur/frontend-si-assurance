import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { checkBlacklist } from '../api/personneAPI'

// Typage explicite de la structure de l'erreur retournée par l'API
type APIErrorResponse = {
  message: string
}

export const useCheckBlacklist = (numeroIdentification?: string) => {
  const query = useQuery<boolean, AxiosError<APIErrorResponse>>({
    queryKey: ['blacklist-status', numeroIdentification],
    queryFn: () => checkBlacklist(numeroIdentification!),
    enabled: !!numeroIdentification,
    staleTime: 60000,
  })

  useEffect(() => {
    if (query.data !== undefined) {
      console.log(`Blacklist status for ${numeroIdentification}:`, query.data)
    }

    if (query.error) {
      // Forcer ici le typage de l'erreur
      const apiError = query.error as AxiosError<APIErrorResponse>
      console.error(
        ' Erreur vérification blacklist:',
        apiError.response?.data?.message || apiError.message
      )
    }
  }, [query.data, query.error, numeroIdentification])

  return query
}
