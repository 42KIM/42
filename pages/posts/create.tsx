import { createPrivateGetServerSideProps } from '@/lib/create-private-get-server-side-props';

export { default } from '@/components/pages/posts/Create';

export const getServerSideProps = createPrivateGetServerSideProps(() => {
  return {
    props: {},
  };
});
