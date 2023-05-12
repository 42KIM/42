import dbConnect from '@/lib/mongoose';
import type { Post } from '@/models/Posts';
import Posts from '@/models/Posts';
import { ObjectId } from 'mongodb';

export { default } from '@/components/pages/posts/post';

export const getStaticPaths = async () => {
  await dbConnect();

  const results = await Posts.find<Post>({});

  return {
    paths: results.map(({ _id }) => ({ params: { id: _id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  await dbConnect();

  const { id } = context.params;
  const result = await Posts.findOne<Post>({ _id: new ObjectId(id) });

  return {
    props: {
      post: JSON.parse(JSON.stringify(result)),
    },
  };
};
