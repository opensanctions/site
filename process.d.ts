declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    AUTH0_CLIENT_ID: string
    AUTH0_CLIENT_SECRET: string
  }
}
