import { useAuth } from 'react-oidc-context'
import { useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { setAuthToken } from '@/lib/api'

interface Props {
  children: React.ReactNode
}

export function AuthGuard({ children }: Props) {
  const auth = useAuth()

  useEffect(() => {
    setAuthToken(auth.user?.access_token ?? null)
  }, [auth.user])

  if (auth.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (auth.error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">Błąd logowania: {auth.error.message}</Typography>
      </Box>
    )
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect()
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}
