import { APIService } from '@/apis';
import { useUser } from '@/lib/auth.service';
import type { Post } from '@/models/Posts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PostEdit from './Edit';
import PostDetail from './Detail';

type PostPageProps = {
  post: Post,
};

const PostPage = ({ post }: PostPageProps) => {
  const router = useRouter();
  const user = useUser();
  const [ pageMode, setPageMode ] = useState<'detail' | 'edit'>('detail');

  const handleDelete = async () => {
    await APIService.deletePosts({ _id: post._id });
    alert('삭제되었습니다.');
    router.push('/posts');
  };

  if (!post) return null;

  return (
    <div>
      <div className='flex justify-between text-sm text-blue-300'>
        <Link href={'/posts'}>
          <button>◀️ 목록</button>
        </Link>
        {user?.isAdmin && (
          <div className='flex gap-4'>
            {pageMode === 'detail'
              ? <button onClick={() => {
                setPageMode('edit');
              }}>수정하기</button>
              : <button onClick={() => {
                setPageMode('detail');
                router.reload();
              }}>취소</button>
            }
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        )}
      </div>
      {pageMode === 'detail' && <PostDetail post={post} />}
      {pageMode === 'edit' && <PostEdit post={post} onSubmit={() => {
        setPageMode('detail');
      }} />}
    </div>
  );
};

export default PostPage;
