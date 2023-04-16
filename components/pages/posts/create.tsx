import { useState } from 'react';

const CreatePost = () => {
  const [ title, setTitle ] = useState('');
  const [ date, setDate ] = useState('');
  const [ content, setContent ] = useState('');
  const [ tags, setTags ] = useState('');

  return (
    <div className="flex flex-col">
      <input placeholder="title" value={title} onChange={(e) => {
        setTitle(e.target.value);
      }} />
      <input type="date" onChange={(e) => {
        setDate(e.target.value);
      }} />
      <textarea placeholder="content" value={content} onChange={(e) => {
        setContent(e.target.value);
      }} />
      <input placeholder="tags" value={tags} onChange={(e) => {
        setTags(e.target.value);
      }} />
      <button>create</button>
    </div>
  );
};

export default CreatePost;
