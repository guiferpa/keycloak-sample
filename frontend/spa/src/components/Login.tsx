import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const Login: React.FunctionComponent = () => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <button onClick={() => keycloak.login()}>
      Log in
    </button>
  );
}

export default Login;