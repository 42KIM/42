import Link from 'next/link';

const Posts = () => {
  return (
    <div>
      <Link href="/posts/create">
        this is posts page!
        <button>글쓰기</button>
      </Link>
    </div>
  );
};

export default Posts;
