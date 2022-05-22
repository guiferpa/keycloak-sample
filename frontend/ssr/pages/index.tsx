import { v4 as uuid } from 'uuid';
import absoluteUrl from 'next-absolute-url';
import qs from 'query-string';
import type { 
  GetServerSideProps, 
  GetServerSidePropsContext, 
  GetServerSidePropsResult, 
  NextPage 
} from 'next';

const Index: NextPage = () => null;

const getAuthenticationURL = (ctx: GetServerSidePropsContext): string => {
  const abs = absoluteUrl(ctx.req);
  const host = process.env["KEYCLOAK_HOST"];
  const realm = process.env["KEYCLOAK_REALM"];
  const endpoint = `/auth/realms/${realm}/protocol/openid-connect/auth`;
  const params = {
    "client_id": process.env["KEYCLOAK_CLIENT_ID"],
    "response_type": "code",
    "state": uuid(),
    "nonce": `${(new Date()).getTime()}`,
    "scope": "openid profile",
    "redirect_uri": `http://${abs.host}/oauth/auth/callback`
  };

  return `${host}${endpoint}?${qs.stringify(params)}`;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  return {
    redirect: {
      destination: getAuthenticationURL(ctx),
      permanent: false
    }
  }
}

export default Index;
