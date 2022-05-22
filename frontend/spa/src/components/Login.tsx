import React from 'react';
import qs from 'query-string';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';

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
  return <a href={getAuthenticationURL()}> Log in </a>
}

export default Login;