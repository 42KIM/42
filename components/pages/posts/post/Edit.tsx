import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Editor as TuiEditor } from '@toast-ui/react-editor';
import type { Post } from '@/models/Posts';

type PostEditProps = {
  post: Post,
};

const Editor = dynamic(
  () => import('@/components/common/Editor'),
  { ssr: false },
);

const PostEdit = ({ post }: PostEditProps) => {
  const [ title, setTitle ] = useState(post.title);
  const [ date, setDate ] = useState(post.date);
  const [ category, setCategory ] = useState(post.category);
  const [ tags, setTags ] = useState(post.tags.join(' '));

  const editorCallbackRef = (node: TuiEditor | null) => {
    if (node === null) return;
    node.getInstance().setHTML(post.content);
  };

  const handleSubmit = () => {
    // TODO - update api
  };

  return (
    <form className="flex flex-col gap-2">
      <input className='h-10 text-lg border-2 p-2' placeholder="제목" value={title} onChange={(e) => {
        setTitle(e.target.value);
      }} />
      <input className='w-3/12 border-2 p-2' type="date" value={date} onChange={(e) => {
        setDate(e.target.value);
      }} />
      <input className='h-10 text-md border-2 p-2' placeholder="카테고리" value={category} onChange={(e) => {
        setCategory(e.target.value);
      }} />
      {<Editor editorRef={editorCallbackRef} />}
      <input className='h-10 text-md border-2 p-2' placeholder="태그: 공백으로 구분" value={tags} onChange={(e) => {
        setTags(e.target.value);
      }} />
      <button className='w-20 border-2 hover:bg-blue-200 self-end' onClick={handleSubmit}>수정 완료</button>
    </form>
  );
};

export default PostEdit;
