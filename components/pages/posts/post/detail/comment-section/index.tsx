import { useUser } from '@/lib/auth.service';
import Image from 'next/image';
import githubLogo from '@/public/github-mark.svg';
import { useEffect, useState } from 'react';
import GithubLoginButton from '@/components/common/GithubLoginButton';
import { APIService } from '@/apis';
import type { Comment } from '@/models/Comments';
import { formatDate } from '@/lib/format-date';
import Avatar from '@/components/common/Avatart';

type CommentsProps = {
  postId: string,
};

const CommentSection = ({ postId }: CommentsProps) => {
  const user = useUser();

  const [ comment, setComment ] = useState('');
  const [ commentList, setCommentList ] = useState<Comment[]>([]);

  const handleCommentSubmit = async () => {
    if (user === null) return;

    try {
      await APIService.createComments({
        postId,
        content: comment,
        author: user.login,
        authorId: user.id,
        authorAvatar: user.avatar_url,
        authorUrl: user.html_url,
      });
      alert('댓글이 등록되었습니다.');
      setComment('');
      const result = await APIService.getComments(postId);
      setCommentList(result);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const initComment = async () => {
      try {
        const result = await APIService.getComments(postId);
        setCommentList(result);
      } catch (error) {
        throw error;
      }
    };
    initComment();
  }, []);

  return (
    <section className='my-5 py-10 border-t-2'>
      {user ? (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-1'>
            <Image src={githubLogo} alt='github_logo' width={20} />
            <span>{user.login}</span>
          </div>
          <textarea
            className="w-full h-20 p-2 border-2 resize-none rounded-md"
            placeholder='댓글을 작성하세요.'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            disabled={comment === ''}
            className='w-14 self-end rounded-md text-white bg-blue-400 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleCommentSubmit}
          >등록</button>
        </div>
      ) : (
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
          {commentList.map((comment) => (
            <div key={comment._id} className='flex flex-col gap-3 px-2 py-5'>
              <div className='flex items-center gap-2'>
                <Avatar
                  src={comment.authorAvatar}
                  width={50}
                />
                <div className='flex flex-col'>
                  <a href={comment.authorUrl} target='_blank' rel="noreferrer">
                    <span className='text-lg hover:opacity-50 hover:cursor-pointer'>{comment.author}</span>
                  </a>
                  <span className='text-sm text-gray-400'>{formatDate(comment.createdAt)}</span>
                </div>
              </div>
              <span>{comment.content}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentSection;
