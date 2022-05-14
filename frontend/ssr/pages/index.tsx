import { useKeycloak } from '@react-keycloak-fork/ssr'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  const { keycloak } = useKeycloak();

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => keycloak?.login()}>Log in</button>
    </>
  );
}

export default Home;
