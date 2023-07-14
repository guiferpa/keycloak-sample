import React from 'react';
import qs from 'query-string';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    const host = process.env["REACT_APP_KEYCLOAK_HOST"];
    const realm = process.env["REACT_APP_KEYCLOAK_REALM"];
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });
    const resp: AxiosResponse<any> = await requester.get(`/realms/${realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("frontend-spa:access_token")}`
      }
    });

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return false;

    return true;
  } catch(err) {
    return false;
  }
}

const getAuthenticationURL = (): string => {
  const host = process.env["REACT_APP_KEYCLOAK_HOST"];
  const realm = process.env["REACT_APP_KEYCLOAK_REALM"];
  const endpoint = `/realms/${realm}/protocol/openid-connect/auth`;
  const params = {
    "client_id": process.env["REACT_APP_KEYCLOAK_CLIENT_ID"],
    "response_type": "id_token token",
    "state": uuid(),
    "nonce": `${(new Date()).getTime()}`,
    "scope": "openid profile",
    "redirect_uri": `${window.location.origin.toString()}/oauth/auth/callback`
  };

  return `${host}${endpoint}?${qs.stringify(params)}`;
}

const Login: React.FunctionComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    isUserAuthenticated()
      .then((result) => setIsAuthenticated(result))
      .catch(() => setIsAuthenticated(false))
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to={"/profile"} />;
  }

  return <a href={getAuthenticationURL()}> Log in </a>
}

export default Login;
