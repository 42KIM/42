import { useRouter } from 'next/router';

const Posts = () => {
  const router = useRouter();

  return (
    <div>
      this is posts page!
      <button onClick={() => router.push('/posts/create')}>글쓰기</button>
    </div>
  );
};

export default Posts;
