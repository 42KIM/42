import { useEffect, useState } from 'react';
import { APIService } from '@/apis';
import { useUser } from '@/lib/auth.service';
import { useDialog } from '@/lib/use-dialog';
import type { Like } from '@/models/Likes';

type LikesProps = {
  postId: string,
};

type LikedAuthors = Like['authors'];

const unlikedStyle = 'border-blue-200 text-blue-200';
const likedStyle = 'border-blue-500 text-blue-700';

const PostLikes = ({ postId }: LikesProps) => {
  const [ liked, setLiked ] = useState(false);
  const [ likedUsers, setLikedUsers ] = useState<LikedAuthors>([]);
  const { showDialog, showErrorDialog } = useDialog();
  const user = useUser();

  const handleClick = async () => {
    if (user) {

      const nextAuthors = liked
        ? likedUsers.filter(({ authorId }) => authorId !== user.id)
        : [ ...likedUsers, { author: user.login, authorId: user.id } ];

      await APIService.likePosts({ postId, authors: nextAuthors });

      setLikedUsers(nextAuthors);
      setLiked(!liked);
    } else {
      showDialog({
        title: '알림',
        content: '좋아요를 누르려면 로그인이 필요합니다.',
      });
    }
  };

  useEffect(() => {
    const initLikes = async () => {
      try {
        const result = await APIService.getPostLikes(postId);
        const initialLiked = result.authors.some(({ authorId }) => authorId === user?.id);

        setLiked(initialLiked);
        setLikedUsers(result.authors);
      } catch (error) {
        showErrorDialog(error);
      }
    };

    initLikes();
  }, [ postId, user, showErrorDialog ]);

  return (
    <div className="flex justify-center h-20 my-10">
      <button
        className={`flex flex-col justify-center items-center w-28 h-full border-2 rounded-lg hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 ${liked ? likedStyle : unlikedStyle}`}
        onClick={handleClick}
      >
        <span className="text-2xl">👍</span>
        <span className="text-sm">{likedUsers?.length || 0}</span>
      </button>
    </div>
  );
};

export default PostLikes;
