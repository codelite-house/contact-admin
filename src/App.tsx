import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'react-oidc-context'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { getOidcConfig } from '@/auth/oidcConfig'
import { AuthGuard } from '@/auth/AuthGuard'
import { AppLayout } from '@/components/AppLayout'
import { MessagesPage } from '@/pages/MessagesPage'
import { MessageDetailPage } from '@/pages/MessageDetailPage'
import { CallbackPage } from '@/pages/CallbackPage'

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
})

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
  },
})

export function App() {
  return (
    <AuthProvider {...getOidcConfig()}>
      <QueryClientProvider client={qc}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/callback" element={<CallbackPage />} />
              <Route
                element={
                  <AuthGuard>
                    <AppLayout />
                  </AuthGuard>
                }
              >
                <Route index element={<Navigate to="/messages" replace />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/messages/:id" element={<MessageDetailPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
