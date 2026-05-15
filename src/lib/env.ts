declare global {
  interface Window {
    __env?: {
      ZITADEL_ISSUER?: string
      ZITADEL_CLIENT_ID?: string
      API_URL?: string
    }
  }
}

export const env = {
  ZITADEL_ISSUER: window.__env?.ZITADEL_ISSUER || import.meta.env.VITE_ZITADEL_ISSUER || '',
  ZITADEL_CLIENT_ID: window.__env?.ZITADEL_CLIENT_ID || import.meta.env.VITE_ZITADEL_CLIENT_ID || '',
  API_URL: window.__env?.API_URL || import.meta.env.VITE_API_URL || '',
}
