import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';
import { ObjectId } from 'mongodb';

export { default } from '@/components/pages/posts/post';

export const getStaticPaths = async () => {
  await dbConnect();

  const results = await Posts.find({});

  return {
    paths: results.map(({ _id }) => ({ params: { id: _id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  await dbConnect();

  const { id } = context.params;
  const result = await Posts.findOne({ _id: new ObjectId(id) });

  return {
    props: {
      post: JSON.parse(JSON.stringify(result)),
    },
  };
};

// TODO - 포스팅 수정 기능을 추가하면 on-demand ISR을 추가한다.
