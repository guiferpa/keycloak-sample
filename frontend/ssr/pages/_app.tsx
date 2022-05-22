import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function _App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default _App;
