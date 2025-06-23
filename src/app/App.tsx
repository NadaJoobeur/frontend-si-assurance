import React from 'react'
import { AppRouter } from './routes/AppRouter'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import theme from './theme/index'
const queryClient = new QueryClient()

const App = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </ChakraProvider>
)

const App = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </ChakraProvider>
)

export default App
