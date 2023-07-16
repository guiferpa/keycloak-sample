Awesome ref link: 
- https://www.appsdeveloperblog.com/keycloak-authorization-code-grant-example/
- https://trigodev.com/blog/how-to-customize-keycloak-themes

## Get started

### To do list before start the sample

1. Change your /etc/hosts including `<current LAN IP> host.docker.internal`
2. Exec `docker-componse up --build` to up and build frontend and backend images

### SSO Keycloak
When SSO's started then access http://host.docker.internal:8080/admin and use the creds **username**: admin, **password**: pwd.

### Frontend SPA
This client has a flow based on public and implicit flow then you have to config this flow in Keycloak befora make your tests

### Frontend SSR
This client has a flow based on confidential with authorization_code grant type then you have to config this flow in Keycloak before make your tests

### Backend API
This client has a flow with the goals just for get userinfo from Keycloak using Keycloak `access_token`.
