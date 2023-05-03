import type { Post } from '@/models/Posts';
import dynamic from 'next/dynamic';

type PostDetailProps = {
  post: Post,
};

const EditorViewer = dynamic(
  () => import('@/components/common/EditorViewer'),
  { ssr: false },
);

const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <div className='py-2'>
      <span>{post.title}</span>
      <div>
        <EditorViewer content={post.content} />
      </div>
    </div>
  );
};

export default PostDetail;
