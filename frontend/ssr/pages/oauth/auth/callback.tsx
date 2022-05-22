import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import qs from 'query-string';
import absoluteUrl from 'next-absolute-url';
import { setCookie } from 'nookies';

const getAccessToken = async (ctx: GetServerSidePropsContext, clientId: string, clientSecret: string): Promise<any> => {
  try {
    const { code } = ctx.query;
    const { origin } = absoluteUrl(ctx.req);
    const host: string = "http://10.0.0.213:8080";
    const realm: string = "sample";
    const endpoint: string = `/auth/realms/${realm}/protocol/openid-connect/token`;
    const data = {
      "client_id": clientId,
      "client_secret": clientSecret,
      "nonce": `${(new Date()).getTime()}`,
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": `${origin}/oauth/auth/callback`
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
    if (aerr.isAxiosError) console.log(aerr.response);
    throw err;
  }
}

const AuthCallback: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const clientId = process.env["KEYCLOAK_CLIENT_ID"] as string;
  const clientSecret = process.env["KEYCLOAK_CLIENT_SECRET"] as string;

  const body: any = await getAccessToken(ctx, clientId, clientSecret);

  setCookie(ctx, "frontend-ssr:access_token", body["access_token"] as string, {
    path: "/"
  });
  setCookie(ctx, "frontend-ssr:access_token_expires_in", body["expires_in"] as string, {
    path: "/"
  });
  setCookie(ctx, "frontend-ssr:id_token", body["id_token"] as string, {
    path: "/"
  });
  setCookie(ctx, "frontend-ssr:refresh_token", body["refresh_token"] as string, {
    path: "/"
  });

  return {
    redirect: {
      destination: "/profile",
      permanent: false
    }
  }
}

export default AuthCallback;
