import Layout from '@/components/layout';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

type PageComponentWithProps = NextPage & {
  getLayoutProps?: () => Parameters<typeof Layout>[0],
};

export default function App({ Component, pageProps }: AppProps & { Component: PageComponentWithProps }) {
  const layoutProps = Component.getLayoutProps?.() || {};

  return (
    <>
      <Head>
        <title>42</title>
        <meta name="description" content="Logs of a front-end developer 42KIM" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
