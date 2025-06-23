// shared/components/PageLayout.tsx
import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Navbar from './Sidebar'
import Footer from './Footer'

interface PageLayoutProps {
  children: React.ReactNode
  withGradient?: boolean
  containerProps?: object
}

const PageLayout = ({ children, withGradient = false, containerProps = {} }: PageLayoutProps) => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('white', 'gray.100')
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, teal.400)',
    'linear(to-r, blue.600, teal.600)'
  )

  return (
    <Box
      minH="100vh"
      bg={bg}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Navbar />

      <Box
        bgGradient={withGradient ? bgGradient : undefined}
        color={withGradient ? textColor : undefined}
        py={{ base: 12, md: 20 }}
        boxShadow={withGradient ? '2xl' : undefined}
        rounded={withGradient ? '3xl' : undefined}
        mx={{ base: 6, md: 20, lg: 40 }}
        mt={8}
        {...containerProps}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  )
}

export default PageLayout
