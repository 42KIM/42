import { useUser } from '@/lib/auth.service';
import Image from 'next/image';
import githubLogo from '@/public/github-mark.svg';
import { useEffect, useState } from 'react';
import GithubLoginButton from '@/components/common/GithubLoginButton';
import { APIService } from '@/apis';
import type { Comment } from '@/models/Comments';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import { useDialog } from '@/lib/use-dialog';
import { useErrorDialog } from '@/lib/use-error-dialog';

type CommentSectionProps = {
  postId: string,
};

const CommentSection = ({ postId }: CommentSectionProps) => {
  const user = useUser();
  const { showDialog } = useDialog();
  const { showErrorDialog } = useErrorDialog();

  const [ commentList, setCommentList ] = useState<Comment[]>([]);

  const refetchComment = async () => {
    try {
      const result = await APIService.getComments(postId);
      setCommentList(result);
    } catch (error) {
      showErrorDialog(error);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (user === null) return;

    try {
      await APIService.createComments({
        postId,
        content,
        author: user.login,
        authorId: user.id,
        authorAvatar: user.avatar_url,
        authorUrl: user.html_url,
      });
      showDialog({
        title: '완료',
        content: '댓글이 등록되었습니다.',
        onConfirm: refetchComment,
      });
    } catch (error) {
      showErrorDialog(error);
    }
  };

  useEffect(() => {
    const initComment = async () => {
      try {
        const result = await APIService.getComments(postId);
        setCommentList(result);
      } catch (error) {
        showErrorDialog(error);
      }
    };

    initComment();
  }, [ postId, showErrorDialog ]);

  return (
    <section className='my-5 py-10 border-t-2'>
      {user
        ? <CommentInput
          userName={user.login}
          userAvatar={user.avatar_url}
          onSubmit={handleCommentSubmit} />
        : (
          <div className='flex gap-2 justify-center items-center'>
            <span>댓글을 작성하려면 로그인이 필요합니다.</span>
            <GithubLoginButton>
              <div className='flex items-center gap-1'>
                <Image src={githubLogo} alt='github_logo' width={14} />
                <span className='text-sm text-black hover:text-gray-500'>Login with Github</span>
              </div>
            </GithubLoginButton>
          </div>
        )}
      {commentList.length > 0 && (
        <div className='flex flex-col gap-4 mt-14'>
          {commentList.map((comment) =>
            <CommentCard
              key={comment._id}
              user={user}
              comment={comment}
              onRefetch={refetchComment}
            />)}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
