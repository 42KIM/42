export { default } from '@/components/pages/posts/Create';

// TODO - private route 모듈화
export const getServerSideProps = (context) => {
  const { req } = context;

  if (!req.headers.cookie) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};
