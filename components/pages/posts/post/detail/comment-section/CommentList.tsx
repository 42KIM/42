import Avatar from '@/components/common/Avatart';
import { formatDate } from '@/lib/format-date';
import type { Comment } from '@/models/Comments';

type CommentListProps = {
  comments: Comment[],
};

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className='flex flex-col gap-4 mt-14'>
      {comments.map(({ _id, content, author, authorAvatar, authorUrl, createdAt }) => (
        <div key={_id} className='flex flex-col gap-3 px-2 py-5'>
          <div className='flex items-center gap-2'>
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
          </div>
          <span>{content}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
