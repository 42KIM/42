import { APIService } from '@/apis';
import { useUser } from '@/lib/auth.service';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditorViewer = dynamic(
  () => import('@/components/common/EditorViewer'),
  { ssr: false },
);

const PostDetail = (props) => {
  const { post } = props;
  const router = useRouter();
  const user = useUser();

  const handleClick = async () => {
    await APIService.deletePosts({ _id: post._id });
    alert('삭제되었습니다.');
    router.push('/posts');
  };

  return (
    <div>
      <div className='flex justify-between text-sm text-blue-300'>
        <Link href={'/posts'}><button>◀️ 목록</button></Link>
        {user?.isAdmin && <button onClick={handleClick}>삭제하기</button>}
      </div>
      <div className='py-2'>
        <span>{post.title}</span>
        <div>
          <EditorViewer content={post.content} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
