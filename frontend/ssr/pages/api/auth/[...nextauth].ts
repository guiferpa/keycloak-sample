import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

export default NextAuth({
  debug: true,
  secret: "Z82djfjMNk4gmvLW",
  providers: [
    KeycloakProvider({
      clientId: 'frontend-ssr',
      clientSecret: 'lGMybzhFmmDPnjTY5fnsRN82TNbX1F1n',
      issuer: 'http://localhost:8080/auth/realms/sample'
    })
  ]
});