import clientPromise from '@/lib/mongodb';

export { default } from '@/components/pages/posts';

export const getServerSideProps = async () => {
  const client = await clientPromise;
  const results = await client.db('42_blog')
    .collection('posts')
    .find({})
    .limit(10)
    .toArray();

  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};
