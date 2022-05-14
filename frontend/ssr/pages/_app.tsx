import type { AppContext, AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak-fork/ssr';

import { config as keycloakConfig } from '../services/auth';

interface InitialProps {
  cookies: any;
}

function _App({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <SSRKeycloakProvider keycloakConfig={keycloakConfig} persistor={SSRCookies(cookies)}>
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  );
}

_App.getInitialProps = async (app: AppContext) => {
  return {
    cookies: app.ctx.req ? parseCookies(app.ctx) : {}
  }
}

export default _App;
