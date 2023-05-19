import { APIService } from '@/apis';
import Avatar from '@/components/common/Avatart';
import { formatDate } from '@/lib/format-date';
import type { Comment } from '@/models/Comments';
import { useMemo, useState } from 'react';

const unlikedStyle = 'w-fit py-1 px-2 text-xs border-2 border-neutral-300 rounded-2xl text-neutral-400 hover:cursor-pointer hover:border-rose-300 hover:text-rose-500';
const likedStyled = 'w-fit py-1 px-2 text-xs border-2 border-rose-300 rounded-2xl text-rose-500 hover:cursor-pointer';

type CommentCardProps = {
  userId?: number,
  comment: Comment,
  onRefetch: () => void,
};

const CommentCard = ({
  userId,
  comment: {
    _id,
    content: initialContent,
    author,
    authorId,
    authorAvatar,
    authorUrl,
    likes,
    createdAt,
    isEdited,
  },
  onRefetch,
}: CommentCardProps) => {
  const [ content, setContent ] = useState(initialContent);
  const [ isEditMode, setIsEditMode ] = useState(false);

  const isMyComment = useMemo(() => userId === authorId, [ userId, authorId ]);
  const isMyLike = useMemo(() => likes.some((like) => like.authorId === userId), [ likes, userId ]);
  const likedUsers = useMemo(() => {
    const joinedNames = likes.map((like) => like.author).join(', ');
    return likes.length <= 5 ? joinedNames : `${joinedNames} 외 ${likes.length - 5}명이 좋아합니다.`;
  }, [ likes ]);

  const handleEditComment = async ({ _id, content }: { _id: string, content: string }) => {
    if (!content.length) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    try {
      await APIService.updateComments({
        _id,
        content,
        isEdited: true,
      });
      alert('댓글이 수정되었습니다.');
      setIsEditMode(false);
      onRefetch();
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteComment = async (_id: string) => {
    try {
      await APIService.deleteComments({ _id });
      alert('댓글이 삭제되었습니다.');
      onRefetch();
    } catch (error) {
      throw error;
    }
  };

  const handleLikeComment = async ({
    _id,
    author,
    likes,
  }: {
    _id: string,
    author: string,
    likes: Array<{ authorId: number, author: string }>,
  }) => {
    const nextLikes = likes.some(({ authorId }) => authorId === userId)
      ? likes.filter(({ authorId }) => authorId !== userId)
      : [ ...likes, { author, authorId } ];

    try {
      await APIService.likeComments({ _id, likes: nextLikes });
      onRefetch();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className='flex flex-col gap-3 px-2 py-5'>
      <div className='flex items-start gap-2'>
        <Avatar
          src={authorAvatar}
          width={50}
        />
        <div className='flex flex-col'>
          <a href={authorUrl} target='_blank' rel="noreferrer">
            <span className='text-lg hover:opacity-50 hover:cursor-pointer'>{author}</span>
          </a>
          <span className='text-sm text-gray-400'>{formatDate(createdAt)}</span>
        </div>
        {isMyComment && (
          <div className='flex gap-2 ml-auto'>
            <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => {
                setIsEditMode(!isEditMode);
                setContent(initialContent);
              }}>{isEditMode ? '취소' : '수정'}</button>
            {isEditMode && <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => handleEditComment({ _id, content })}>완료</button>}
            <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => handleDeleteComment(_id)}
            >삭제</button>
          </div>
        )}
      </div>
      {isEditMode
        ? (
          <textarea
            className='border-2 rounded-md p-2 resize-none'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        )
        : (
          <p>
            <span>{initialContent}</span>
            {isEdited && <span className='ml-1 text-xs text-gray-400'>(수정됨)</span>}
          </p>
        )}
      <div className='flex items-center mt-3'>
        <button
          className={isMyLike ? likedStyled : unlikedStyle}
          onClick={() => handleLikeComment({ _id, author, likes })}
        >좋아요 {likes?.length}</button>
        {likes.length > 0 && <span className='ml-1 text-xs text-gray-400'>by {likedUsers}</span>}
      </div>
    </div>
  );
};

export default CommentCard;
