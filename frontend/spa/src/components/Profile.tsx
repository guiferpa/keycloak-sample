import { useKeycloak } from '@react-keycloak/web';
import React from 'react';

const Profile: React.FunctionComponent = () => {
  const { keycloak } = useKeycloak();

  // @ts-ignore
  const parsed: Keycloak.KeycloakTokenParsed = keycloak.tokenParsed;

  return (
    <div>
      <ul>
        <li>
          <b>Name</b>: <span>{ parsed.name }</span>
        </li>
        <li>
          <b>Scope</b>: <span>{ parsed.scope }</span>
        </li>
      </ul>
      <button onClick={() => keycloak.logout()}>Log out</button>
    </div>
  )
}

export default Profile;
