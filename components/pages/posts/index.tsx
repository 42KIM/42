import { useRouter } from 'next/router';

const Posts = ({ results }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/posts/create')}>글쓰기</button>
      <ul>
        {results.map(({ _id, title }) => <li key={_id}>✅{title}</li>)}
      </ul>
    </div>
  );
};

export default Posts;
