import dynamic from 'next/dynamic';
import Link from 'next/link';

const EditorViewer = dynamic(
  () => import('@/components/common/EditorViewer'),
  { ssr: false },
);

const PostDetail = (props) => {
  const { post } = props;

  return (
    <div>
      <Link href={'/posts'}>Back</Link>
      <div>
        <span>{post.title}</span>
        <div>
          <EditorViewer content={post.content} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
