import React from 'react';
import qs from 'query-string';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';

const getLogOutURL = (): string => {
  const host = process.env["REACT_APP_KEYCLOAK_HOST"];
  const realm = process.env["REACT_APP_KEYCLOAK_REALM"];
  const endpoint = `/auth/realms/${realm}/protocol/openid-connect/logout`;
  const params = { 
    "post_logout_redirect_uri": `${window.location.origin}/login`,
    "id_token_hint": localStorage.getItem(`${process.env["REACT_APP_KEYCLOAK_CLIENT_ID"]}:id_token`)
  };

  return `${host}${endpoint}?${qs.stringify(params)}`;
}

interface User {
  name: string;
}

const getUser = async (): Promise<User | null> => {
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

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return null;

    return resp.data
  } catch(err) {
    return null;
  }
}

const Profile: React.FunctionComponent = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    getUser()
      .then((result) => setUser(result))
      .catch(() => setUser(null))
  }, []);

  return (
    <div>
      {user && (
        <div>
          <span>
            <b>Name:</b> {user.name}
          </span>
        </div>
      )}
      <a href={getLogOutURL()}>Log out</a>
    </div>
  )
}

export default Profile;
