import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export { default } from '@/components/pages/posts/detail';

export const getStaticPaths = async () => {
  const client = await clientPromise;
  const results = await client.db('42_blog')
    .collection('posts')
    .find({})
    .toArray();

  return {
    paths: results.map(({ _id }) => ({ params: { id: _id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  const client = await clientPromise;
  const result = await client.db('42_blog')
    .collection('posts')
    .findOne({
      _id: new ObjectId(id),
    });

  return {
    props: {
      post: JSON.parse(JSON.stringify(result)),
    },
  };
};

// TODO - 포스팅 수정 기능을 추가하면 on-demand ISR을 추가한다.
