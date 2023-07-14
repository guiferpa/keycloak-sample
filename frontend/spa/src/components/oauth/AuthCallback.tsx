import React from 'react';
import qs from 'query-string';
import { Navigate, useLocation } from 'react-router-dom';

const OAuthCallback: React.FunctionComponent = () => {
  const location = useLocation();

  console.log("Location from Keycloak:", location);

  if (location.search !== "") {
    const params = qs.parse(location.search);
    return (
      <div>
        <h3>Error: {params['error']}</h3>
        <p>Description: {params['error_description']}</p>
      </div>
    )
  }

  const params = qs.parse(location.hash);

  localStorage.setItem("frontend-spa:access_token", params["access_token"] as string);
  localStorage.setItem("frontend-spa:access_token_expires_in", params["expires_in"] as string);
  localStorage.setItem("frontend-spa:id_token", params["id_token"] as string);

  return <Navigate to={"/profile"} />;
}

export default OAuthCallback;
