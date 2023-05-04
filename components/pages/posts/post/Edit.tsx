import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import type { Editor as TuiEditor } from '@toast-ui/react-editor';
import type { Post } from '@/models/Posts';
import { APIService } from '@/apis';

type PostEditProps = {
  post: Post,
  onSubmit: () => void,
};

const Editor = dynamic(
  () => import('@/components/common/Editor'),
  { ssr: false },
);

const PostEdit = ({ post, onSubmit }: PostEditProps) => {
  const [ title, setTitle ] = useState(post.title);
  const [ date, setDate ] = useState(post.date);
  const [ category, setCategory ] = useState(post.category);
  const [ tags, setTags ] = useState(post.tags.join(' '));
  const editorRef = useRef<TuiEditor | null>(null);

  const editorRefCallback = (node: TuiEditor | null) => {
    if (node === null) return;
    node.getInstance().setMarkdown(post.content);
    editorRef.current = node;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await APIService.updatePosts({
        _id: post._id,
        title,
        date,
        category,
        tags: tags.trim().split(' '),
        content: editorRef.current?.getInstance().getMarkdown(),
      });
      alert('수정이 완료되었습니다.');
      onSubmit();
    } catch (error) {
      throw error;
    }
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
      {<Editor editorRef={editorRefCallback} />}
      <input className='h-10 text-md border-2 p-2' placeholder="태그: 공백으로 구분" value={tags} onChange={(e) => {
        setTags(e.target.value);
      }} />
      <button className='w-20 border-2 hover:bg-blue-200 self-end' onClick={handleSubmit}>수정 완료</button>
    </form>
  );
};

export default PostEdit;
