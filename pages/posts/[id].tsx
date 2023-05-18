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
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  await dbConnect();

  const { id } = context.params;

  // TODO - error handle (유효하지 않은 id 일때 에러 발생 등)
  const result = await Posts.findOne<Post>({ _id: new ObjectId(id) });

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(Object.assign(result, { _id: result._id.toString() }))),
    },
  };
};
