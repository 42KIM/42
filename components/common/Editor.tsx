import EasyMDE from 'easymde';
import { memo } from 'react';
import type { MutableRefObject } from 'react';
import { parseMarkdownToHTML } from '@/lib/parse-markdown';
import 'easymde/dist/easymde.min.css';

type EditorProps = {
  editorRef: MutableRefObject<EasyMDE | null>,
  initialValue?: string,
};

const Editor = ({ editorRef, initialValue = '' }: EditorProps) => {
  const callbackRef = (node: HTMLTextAreaElement) => {
    if (node === null) return;

    const easyMde = new EasyMDE({
      element: node,
      initialValue,
      autofocus: true,
      spellChecker: false,
      maxHeight: '800px',
      sideBySideFullscreen: false,
      previewClass: '',
      previewRender: (plainText: string) => parseMarkdownToHTML(plainText),
    });

    editorRef.current = easyMde;
  };

  return (
    <div className="prose prose-sm max-w-none max-h-fit prose-p:my-1 prose-hr:my-5 prose-ul:my-1 prose-code:text-xs">
      <textarea ref={callbackRef} />
    </div>
  );
};

export default memo(Editor);
