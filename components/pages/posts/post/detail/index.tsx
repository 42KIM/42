import type { Post } from '@/models/Posts';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import CommentSection from './comment-section';

type PostDetailProps = {
  post: Post,
};

const EditorViewer = dynamic(
  () => import('@/components/common/EditorViewer'),
  { ssr: false },
);

const PostDetail = ({ post: { _id, date, title, content, tags } }: PostDetailProps) => {
  return (
    <>
      <Head>
        <title>{`${title} - 42's blog`}</title>
      </Head>
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
        <div>
          <EditorViewer content={content} />
        </div>
      </div>
      <CommentSection postId={_id} />
    </>
  );
};

export default PostDetail;
