import Keycloak from "keycloak-js";

export const json: Record<string, any> = JSON.parse(process.env.REACT_APP_KEYCLOAK_CONFIG as string);

export const config: Keycloak.KeycloakConfig = {
  url: json["auth-server-url"],
  realm: json["realm"],
  clientId: json["resource"]
};

const keycloackInstance = new Keycloak(config);

export default keycloackInstance;

export const initOptions: Keycloak.KeycloakInitOptions = {
  onLoad: 'check-sso'
}