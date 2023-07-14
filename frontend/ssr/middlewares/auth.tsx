import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';
import { parseCookies } from 'nookies';

const isUserAuthenticated = async (ctx: GetServerSidePropsContext): Promise<boolean> => {
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

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return false;

    return true;
  } catch(err) {
    return false;
  }
}

export const withAuthentication = (handle: GetServerSideProps): GetServerSideProps => {
  return async function(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> {
    const isAuthenticated = await isUserAuthenticated(ctx);
    if (!isAuthenticated) return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
    return await handle(ctx);
  }
}
