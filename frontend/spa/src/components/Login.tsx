import React from 'react';
import qs from 'query-string';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';

const isUserAuthenticated = async (): Promise<boolean> => {
  try {
    const host = "http://localhost:8080";
    const realm = "sample";
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });
    const resp: AxiosResponse<any> = await requester.get(`/auth/realms/${realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("frontend-spa:access_token")}`
      }
    });

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return false;

    console.log("Authenticated user:", resp.data);
    return true;
  } catch(err) {
    return false;
  }
}

const getAuthenticationURL = (): string => {
  const host = "http://localhost:8080";
  const realm = "sample";
  const endpoint = `/auth/realms/${realm}/protocol/openid-connect/auth`;
  const params = {
    "client_id": "frontend-spa",
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