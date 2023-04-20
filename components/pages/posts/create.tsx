import { APIService } from '@/apis';
import { useState } from 'react';

const CreatePost = () => {
  const [ title, setTitle ] = useState('');
  const [ date, setDate ] = useState('');
  const [ content, setContent ] = useState('');
  const [ tags, setTags ] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await APIService.createPosts({
      title,
      date,
      content,
      tags: tags.trim().split(' '),
    });
  };

  return (
    <form className="flex flex-col gap-2">
      <input className='h-10 text-lg border-2 p-2' placeholder="제목" value={title} onChange={(e) => {
        setTitle(e.target.value);
      }} />
      <input className='w-3/12 border-2 p-2' type="date" onChange={(e) => {
        setDate(e.target.value);
      }} />
      <textarea placeholder="content" value={content} onChange={(e) => {
        setContent(e.target.value);
      }} />
      <input className='h-10 text-md border-2 p-2' placeholder="태그: 공백으로 구분" value={tags} onChange={(e) => {
        setTags(e.target.value);
      }} />
      <button onClick={handleSubmit}>create</button>
    </form>
  );
};

export default CreatePost;
