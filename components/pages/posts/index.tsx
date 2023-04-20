import Link from 'next/link';
import { useRouter } from 'next/router';

const Posts = ({ results }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/posts/create')}>글쓰기</button>
      <ul className='flex flex-col gap-4'>
        {results.map(({ _id, title }) => (
          <Link key={_id} href={`/posts/${_id}`}>
            <li className='border-2 p-8'>✅ {title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
