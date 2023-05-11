import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/auth0"

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
})
