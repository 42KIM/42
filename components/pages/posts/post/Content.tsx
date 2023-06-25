import type { Post } from '@/models/Posts';
import CommentSection from './comment-section';
import Viewer from '@/components/common/Viewer';
import Likes from './Likes';

type PostContentProps = {
  post: Post,
};

const PostContent = ({ post: { _id, date, title, content, tags } }: PostContentProps) => {
  return (
    <>
      <div className='py-4'>
        <div className='flex flex-col items-center border-dashed border-2 border-x-0 mb-16 py-6'>
          {tags.length > 0 && (
            <div className='flex gap-2'>
              {tags.map((tag) => <div key={tag} className='px-1.5 rounded-md bg-blue-100 text-sm text-blue-500'>{tag}</div>)}
            </div>
          )}
          <span className='text-4xl font-bold mt-1'>{title}</span>
          <span className='text-xs'>{date}</span>
        </div>
        <Viewer html={content} />
        <Likes postId={_id} />
        <div className='flex flex-col items-center mt-10'>
          <div className='w-1/3 h-0 border-t-2 border-dotted pt-6' />
          <p className='text-xs text-neutral-400 text-center italic '>
            피드백은 언제나 감사합니다.<br />
            오류 정정, 질문, 토론거리를 자유롭게 댓글로 남겨주세요.<br />
            블로그 소스코드에 대한 리뷰, PR도 적극 환영합니다!<br />
            <a
              className='text-blue-300 hover:text-blue-500'
              href='https://github.com/42KIM/blog'
              target='_blank'
              rel="noreferrer"
            >► Github Repository 바로가기</a>
          </p>
        </div>
      </div>
      <CommentSection postId={_id} />
    </>
  );
};

export default PostContent;
