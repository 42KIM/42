import Link from 'next/link';

const Posts = ({ results }) => {
  return (
    <div>
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
