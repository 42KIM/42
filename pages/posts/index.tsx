import dbConnect from '@/lib/mongoose';
import type { Post } from '@/models/Posts';
import Posts from '@/models/Posts';

export { default } from '@/components/pages/posts';

export const getStaticProps = async () => {
  await dbConnect();

  const results = await Posts.find<Post>({})
    .limit(10);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(results)),
    },
  };
};
