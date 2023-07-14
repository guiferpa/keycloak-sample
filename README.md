Awesome ref link: https://www.appsdeveloperblog.com/keycloak-authorization-code-grant-example/

### To do list before start the sample

1. Change your /etc/hosts including `<current LAN IP> host.docker.internal`
2. Exec `docker-componse up --build` to up and build frontend images
3. Access http://host.docker.internal:8080 to get Keycloak login page
4. Input credentials (username: admin, password: pwd) to log in Keycloak admin section. *Feel free to change env var to set a differente username and password to Keycloak admin*
5. Create two clients called frontend-spa and frontend-ssr

### SSO Keycloak
When SSO's started then access http://host.docker.internal:8080/admin

### Frontend SPA
This client has a flow based on public and implicit flow then you have to config this flow in Keycloak befora make your tests

### Frontend SSR
This client has a flow based on confidential with authorization_code grant type then you have to config this flow in Keycloak before make your tests

### Backend API
This client has a flow with the goals just for get userinfo from Keycloak using Keycloak `access_token`.
