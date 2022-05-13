import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';

import keycloakInstance, { initOptions as keycloakInitOptions } from './services/auth';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <KeycloakProvider authClient={keycloakInstance} initOptions={keycloakInitOptions}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </KeycloakProvider>
);
