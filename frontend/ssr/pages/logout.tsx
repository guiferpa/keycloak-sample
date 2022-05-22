import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';
import { parseCookies } from 'nookies';
import qs from 'query-string';

import { withAuthentication } from '../middlewares/auth';

const Logout: NextPage<{ err?: string }> = (props) => {
  if (props.err) return <span>Something wrong</span>;

  return <span>Log out successful</span>;
}

const logotUser = async (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx);
  const host = process.env["KEYCLOAK_HOST"];
  const realm = process.env["KEYCLOAK_REALM"];
  const clientId = process.env["KEYCLOAK_CLIENT_ID"];
  const clientSecret = process.env["KEYCLOAK_CLIENT_SECRET"];
  const data = {
    "client_id": `${clientId}` ,
    "client_secret": `${clientSecret}`,
    "refresh_token": `${cookies[`${clientId}:refresh_token`]}`
  }
  const requester: AxiosInstance = axios.create({
    baseURL: host,
    timeout: 5000 // 5 seconds
  });
  const resp: AxiosResponse<any> = await requester.post(`/auth/realms/${realm}/protocol/openid-connect/logout`, qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${cookies[`${clientId}:access_token`]}`
    }
  });

  if (resp.status !== HttpStatusCodes.NO_CONTENT) throw new Error("unexpected status code from user logout");
}

export const getServerSideProps: GetServerSideProps = withAuthentication(
  async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<any>> => {
    try {
      await logotUser(ctx);
      return {
        props: {}
      }
    } catch(err) {
      console.error(err);

      return {
        props: {
          err: JSON.stringify(err)
        }
      }
    }
  }
);

export default Logout;
