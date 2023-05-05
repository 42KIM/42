import dbConnect from '@/lib/mongoose';
import Posts from '@/models/Posts';

export { default } from '@/components/pages/posts';

export const getServerSideProps = async () => {
  await dbConnect();

  const results = await Posts.find({})
    .limit(10);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(results)),
    },
  };
};

// TODO - 포스트 생성 후 on-demand ISR 하는 방식으로 변경하기
