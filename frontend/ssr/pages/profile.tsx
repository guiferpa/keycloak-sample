import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import Head from 'next/head';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';

import { withAuthentication } from '../middlewares/auth';
import { parseCookies } from 'nookies';

const Profile: NextPage<{ user: User, secret: string | null }> = (props) => {
  const { user, secret } = props;

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {user && (
          <div>
            <span>
              <b>Name:</b> {user.name} <br />
              <b>Secret message:</b> {secret}
            </span>
          </div>
        )}
        <a href={"/logout"}>Log out</a>
      </div>
    </>
  );
}

interface User {
  name: string;
}

const getUser = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
  try {
    const cookies = parseCookies(ctx);
    const host = process.env["KEYCLOAK_HOST"];
    const realm = process.env["KEYCLOAK_REALM"];
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });
    const resp: AxiosResponse<any> = await requester.get(`/realms/${realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${cookies[`${process.env["KEYCLOAK_CLIENT_ID"]}:access_token`]}`
      }
    });

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return null;

    return resp.data;
  } catch (err) {
    return null;
  }
}

const getSecretMessage = async (ctx: GetServerSidePropsContext): Promise<string> => {
  try {
    const cookies = parseCookies(ctx);
    const host = process.env["BACKEND_API_HOST"];
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });

    const resp: AxiosResponse<any> = await requester.get('/api/hello', {
      headers: {
        "Authorization": `Bearer ${cookies[`${process.env["KEYCLOAK_CLIENT_ID"]}:access_token`]}`
      }
    });

    return resp.data.message as string;
  } catch(err) {
    throw err;
  }
}

export const getServerSideProps: GetServerSideProps = withAuthentication(
  async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    const user = await getUser(ctx);
    const message = await getSecretMessage(ctx);

    return {
      props: { user, secret: message }
    }
  }
);

export default Profile;
