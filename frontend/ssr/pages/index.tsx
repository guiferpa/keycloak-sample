import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => signIn("keycloak")}>Log in</button>
    </>
  );
}

export default Home;
