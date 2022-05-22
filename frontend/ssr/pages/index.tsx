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
  const host = "http://10.0.0.213:8080";
  const realm = "sample";
  const endpoint = `/auth/realms/${realm}/protocol/openid-connect/auth`;
  const params = {
    "client_id": "frontend-ssr",
    "response_type": "code",
    "state": uuid(),
    "nonce": `${(new Date()).getTime()}`,
    "scope": "openid profile",
    "redirect_uri": `http://10.0.0.213:8082/oauth/auth/callback`
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
