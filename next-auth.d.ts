import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      email: string
      name: string  
    },
    expires: string
  }
}
