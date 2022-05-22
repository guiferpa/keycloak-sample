import React from 'react';
import { Outlet, RouteProps } from 'react-router-dom';
import axios, { AxiosResponse, AxiosInstance } from 'axios';
import HttpStatusCodes from 'http-status-codes';

interface PrivateRouteProps extends RouteProps {}

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    const host = process.env["REACT_APP_KEYCLOAK_HOST"];
    const realm = process.env["REACT_APP_KEYCLOAK_REALM"];
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });
    const resp: AxiosResponse<any> = await requester.get(`/auth/realms/${realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(`${process.env["REACT_APP_KEYCLOAK_CLIENT_ID"]}:access_token`)}`
      }
    });

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return false;

    return true;
  } catch(err) {
    return false;
  }
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    isUserAuthenticated()
      .then((result) => setIsAuthenticated(result))
      .catch(() => setIsAuthenticated(false))
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <span>Page not found</span>;
}

export default PrivateRoute;