import { ObjectId } from 'mongodb';
import { createPrivateGetServerSideProps } from '@/lib/create-private-get-server-side-props';
import dbConnect from '@/lib/mongoose';
import type { Post } from '@/models/Posts';
import Posts from '@/models/Posts';

export { default } from '@/components/pages/posts/post/Edit';

export const getServerSideProps = createPrivateGetServerSideProps(async (context) => {
  await dbConnect();

  const { params } = context;

  if (!params?.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  // TODO - error handle (유효하지 않은 id 일때 에러 발생 등)
  const result = await Posts.findOne<Post>({ _id: new ObjectId(id) });

  return {
    props: {
      post: JSON.parse(JSON.stringify(result)),
    },
  };
});
