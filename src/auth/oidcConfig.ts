import type { AuthProviderProps } from 'react-oidc-context'
import { env } from '@/lib/env'

export function getOidcConfig(): AuthProviderProps {
  return {
    authority: env.ZITADEL_ISSUER,
    client_id: env.ZITADEL_CLIENT_ID,
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    scope: 'openid profile email offline_access',
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, '/messages')
    },
  }
}
