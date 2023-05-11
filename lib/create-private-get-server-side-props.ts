import type { GetServerSideProps, GetServerSidePropsResult } from 'next';

type Context = Parameters<GetServerSideProps>[0];
type PrivateGetServerSidePropsCallback = (context: Context) => GetServerSidePropsResult<{}>;

export const createPrivateGetServerSideProps = (callback: PrivateGetServerSidePropsCallback) => async (context: Context) => {
  const { req } = context;

  if (!req.headers.cookie) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/',
      },
    };
  }

  return await callback(context);
};
