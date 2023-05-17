import { useUser } from '@/lib/auth.service';
import Image from 'next/image';
import githubLogo from '@/public/github-mark.svg';
import { useState } from 'react';
import GithubLoginButton from '@/components/common/GithubLoginButton';

const Comments = () => {
  const user = useUser();

  const [ comment, setComment ] = useState('');

  const handleCommentSubmit = () => {
    // call api
  };

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
            className='w-14 self-end rounded-md text-white bg-blue-400 hover:bg-blue-500'
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
    </section>
  );
};

export default Comments;
