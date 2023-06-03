import { APIService } from '@/apis';
import Avatar from '@/components/common/Avatar';
import type { User } from '@/lib/auth.service';
import { formatDate } from '@/lib/format-date';
import { useDialog } from '@/lib/use-dialog';
import type { Comment } from '@/models/Comments';
import { useMemo, useState } from 'react';

const unlikedStyle = 'w-fit py-1 px-2 text-xs border-2 border-neutral-300 rounded-2xl text-neutral-400 hover:cursor-pointer hover:border-rose-300 hover:text-rose-500';
const likedStyled = 'w-fit py-1 px-2 text-xs border-2 border-rose-300 rounded-2xl text-rose-500 hover:cursor-pointer';

type CommentCardProps = {
  user: User | null,
  comment: Comment,
  onRefetch: () => void,
};

const CommentCard = ({
  user,
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
  const { showDialog, showErrorDialog } = useDialog();

  const isMyComment = useMemo(() => user?.id === authorId, [ user, authorId ]);
  const isMyLike = useMemo(() => likes.some((like) => like.authorId === user?.id), [ likes, user ]);
  const likedUsers = useMemo(() => {
    const joinedNames = likes.map((like) => like.author).join(', ');
    return likes.length <= 5 ? joinedNames : `${joinedNames} 외 ${likes.length - 5}명이 좋아합니다.`;
  }, [ likes ]);

  const handleEditComment = async ({ _id, content }: { _id: string, content: string }) => {
    if (!content.length) {
      showDialog({
        title: '주의',
        content: '댓글 내용을 입력해주세요.',
      });
      return;
    }

    try {
      await APIService.updateComments({
        _id,
        content,
        isEdited: true,
      });
      showDialog({
        title: '완료',
        content: '댓글이 수정되었습니다.',
        onConfirm: () => {
          setIsEditMode(false);
          onRefetch();
        },
      });
    } catch (error) {
      showErrorDialog(error);
    }
  };

  const handleDeleteComment = async (_id: string) => {
    try {
      await APIService.deleteComments({ _id });
      showDialog({
        title: '완료',
        content: '댓글이 삭제되었습니다.',
        onConfirm: onRefetch,
      });
    } catch (error) {
      showErrorDialog(error);
    }
  };

  const handleLikeComment = async ({
    userId,
    userName,
  }: {
    userId: number,
    userName: string,
  }) => {
    const nextLikes = likes.some(({ authorId }) => authorId === userId)
      ? likes.filter(({ authorId }) => authorId !== userId)
      : [ ...likes, { author: userName, authorId: userId } ];

    try {
      await APIService.likeComments({ _id, likes: nextLikes });
      onRefetch();
    } catch (error) {
      showErrorDialog(error);
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
          onClick={() => {
            user
              ? handleLikeComment({
                userId: user.id,
                userName: user.login,
              })
              : showDialog({
                title: '주의',
                content: '로그인이 필요합니다.',
              });
          }}
        >좋아요 {likes?.length}</button>
        {likes.length > 0 && <span className='ml-1 text-xs text-gray-400'>by {likedUsers}</span>}
      </div>
    </div>
  );
};

export default CommentCard;
