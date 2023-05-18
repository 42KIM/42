import { APIService } from '@/apis';
import Avatar from '@/components/common/Avatart';
import { formatDate } from '@/lib/format-date';
import type { Comment } from '@/models/Comments';
import React, { useState } from 'react';

type CommentCardProps = {
  userId?: number,
  comment: Comment,
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
    createdAt,
    isEdited,
  },
}: CommentCardProps) => {
  const [ content, setContent ] = useState(initialContent);
  const [ isEditMode, setIsEditMode ] = useState(false);

  const handleEditComment = async (_id: string, content: string) => {
    try {
      await APIService.updateComments({
        _id,
        content,
        isEdited: true,
      });
      alert('댓글이 수정되었습니다.');
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteComment = async (_id: string) => {
    try {
      await APIService.deleteComments({ _id });
      alert('댓글이 삭제되었습니다.');
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
        {userId === authorId && (
          <div className='flex gap-2 ml-auto'>
            <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => {
                setIsEditMode(!isEditMode);
                setContent(initialContent);
              }}>{isEditMode ? '취소' : '수정'}</button>
            {isEditMode && <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => handleEditComment(_id, content)}>완료</button>}
            <button
              className='text-sm text-gray-400 hover:opacity-50 hover:cursor-pointer'
              onClick={() => handleDeleteComment(_id)}
            >삭제</button>
          </div>
        )}
      </div>
      {isEditMode
        ? <textarea
          className='border-2 rounded-md p-2 resize-none'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        : (
          <p>
            <span>{initialContent}</span>
            {isEdited && <span className='ml-1 text-xs text-gray-400'>(수정됨)</span>}
          </p>
        )}
    </div>
  );
};

export default CommentCard;
