import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuth } from 'react-oidc-context'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  const auth = useAuth()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Contact Admin
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, opacity: 0.8 }}>
            {auth.user?.profile.email}
          </Typography>
          <Button color="inherit" size="small" onClick={() => auth.signoutRedirect()}>
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
