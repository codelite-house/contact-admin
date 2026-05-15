declare global {
  interface Window {
    __env?: {
      ZITADEL_ISSUER?: string
      ZITADEL_CLIENT_ID?: string
    }
  }
}

export const env = {
  ZITADEL_ISSUER: window.__env?.ZITADEL_ISSUER || import.meta.env.VITE_ZITADEL_ISSUER || '',
  ZITADEL_CLIENT_ID: window.__env?.ZITADEL_CLIENT_ID || import.meta.env.VITE_ZITADEL_CLIENT_ID || '',
}
