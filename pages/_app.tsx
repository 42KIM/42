import Layout from '@/components/layout';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

type PageComponentWithProps = NextPage & {
  getLayoutProps?: () => Parameters<typeof Layout>[0],
  getPageProps?: () => {
    pageTitle?: string,
    pageDescription?: string,
    hasOgTag?: boolean,
  },
};

export default function App({ Component, pageProps, router }: AppProps & { Component: PageComponentWithProps }) {
  const layoutProps = Component.getLayoutProps?.() || {};

  const {
    pageTitle,
    pageDescription,
    hasOgTag = false,
  } = Component.getPageProps?.() || {};

  const title = pageTitle ? `${pageTitle} - 42's blog` : '42\'s blog';
  const description = pageDescription || '프론트엔드 개발자 42KIM의 개인 기술 블로그';
  const ogUrl = new URL(router.asPath, 'https://42blog.vercel.app');

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {!hasOgTag &&
          <>
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
          </>
        }
        <meta property='og:url' content={ogUrl.href} />
        {/* TODO - add og:image */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
}
