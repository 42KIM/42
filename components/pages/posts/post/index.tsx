import { APIService } from '@/apis';
import { useUser } from '@/lib/auth.service';
import type { Post } from '@/models/Posts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PostContent from './Content';
import { useDialog } from '@/lib/use-dialog';
import { useErrorDialog } from '@/lib/use-error-dialog';

type PostPageProps = {
  post: Post,
};

const PostPage = ({ post }: PostPageProps) => {
  const router = useRouter();
  const user = useUser();
  const { showDialog } = useDialog();
  const { showErrorDialog } = useErrorDialog();

  const handleDelete = async () => {
    try {
      await APIService.deletePosts({ _id: post._id });
      await APIService.revalidatePosts();
      showDialog({
        title: '완료',
        content: '게시물이 삭제되었습니다.',
        onConfirm: () => router.push('/posts'),
      });
    } catch (error) {
      showErrorDialog(error);
    }
  };

  // TODO - loading spinner 추가
  if (router.isFallback) return <div>Loading Page...</div>;

  if (!post) return null;

  return (
    <div>
      <div className='flex justify-between text-sm text-blue-300'>
        <Link href={'/posts'}>
          <button>◀️ 목록</button>
        </Link>
        {user?.isAdmin && (
          <div className='flex gap-4'><button onClick={() => {
            router.push(`/posts/${post._id}/edit`);
          }}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
          </div>
        )}
      </div>
      <PostContent post={post} />
    </div>
  );
};

PostPage.getPageProps = () => {
  return {
    hasOgTag: true,
  };
};

export default PostPage;
