import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpStatusCodes from 'http-status-codes';
import { parseCookies } from 'nookies';


const isUserAuthenticated = async (ctx: GetServerSidePropsContext): Promise<boolean> => {
  try {
    const cookies = parseCookies(ctx);
    const host = "http://10.0.0.213:8080";
    const realm = "sample";
    const requester: AxiosInstance = axios.create({
      baseURL: host,
      timeout: 5000 // 5 seconds
    });
    const resp: AxiosResponse<any> = await requester.get(`/auth/realms/${realm}/protocol/openid-connect/userinfo`, {
      headers: {
        'Authorization': `Bearer ${cookies["frontend-ssr:access_token"]}`
      }
    });

    if (resp.status === HttpStatusCodes.UNAUTHORIZED) return false;

    console.log("Authenticated user:", resp.data);
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