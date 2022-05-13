import React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated) {
    return <Outlet />;
  }

  return <Navigate to={'/login'} />;
}

export default PrivateRoute;