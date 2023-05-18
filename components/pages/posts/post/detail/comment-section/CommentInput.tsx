import Image from 'next/image';
import githubLogo from '@/public/github-mark.svg';
import { useState } from 'react';

type CommentInputProps = {
  userName: string,
  onSubmit: (content: string) => void,
};

const CommentInput = ({ userName, onSubmit }: CommentInputProps) => {
  const [ comment, setComment ] = useState('');

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-1'>
        <Image src={githubLogo} alt='github_logo' width={20} />
        <span>{userName}</span>
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
        onClick={() => {
          onSubmit(comment);
          setComment('');
        }}
      >등록</button>
    </div>
  );
};

export default CommentInput;
