import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';

export { default } from '@/components/pages/posts';

export const getServerSideProps = async () => {
  await dbConnect();

  const results = await Posts.find({})
    .limit(10);

  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
    },
  };
};
