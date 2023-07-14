import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import qs from 'query-string';
import absoluteUrl from 'next-absolute-url';
import { setCookie } from 'nookies';

const getAccessToken = async (ctx: GetServerSidePropsContext, clientId: string, clientSecret: string): Promise<any> => {
  try {
    const { code } = ctx.query;
    const abs = absoluteUrl(ctx.req);
    const host = process.env["KEYCLOAK_HOST"];
    const realm = process.env["KEYCLOAK_REALM"];
    const endpoint: string = `/realms/${realm}/protocol/openid-connect/token`;
    const data = {
      "client_id": clientId,
      "client_secret": clientSecret,
      "nonce": `${(new Date()).getTime()}`,
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": `http://${abs.host}/oauth/auth/callback`
    }

    const requester = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });

    const resp: AxiosResponse<any> = await requester.post(endpoint, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return resp.data;
  } catch (err) {
    const aerr: AxiosError = (err as AxiosError);
    if (aerr.isAxiosError) console.error(aerr.response);
    throw err;
  }
}

const AuthCallback: NextPage = () => null;

const setCookies = (ctx: GetServerSidePropsContext, clientId: string, body: any, options: any) => {
  setCookie(ctx, `${clientId}:access_token`, body["access_token"] as string, options);
  setCookie(ctx, `${clientId}:access_token_expires_in`, body["expires_in"] as string, options);
  setCookie(ctx, `${clientId}:id_token`, body["id_token"] as string, options);
  setCookie(ctx, `${clientId}:refresh_token`, body["refresh_token"] as string, options);
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const clientId = process.env["KEYCLOAK_CLIENT_ID"];
  const clientSecret = process.env["KEYCLOAK_CLIENT_SECRET"];

  const body: any = await getAccessToken(ctx, clientId as string, clientSecret as string);

  setCookies(ctx, clientId as string, body, { path: "/" });

  return {
    redirect: {
      destination: "/profile",
      permanent: false
    }
  }
}

export default AuthCallback;
