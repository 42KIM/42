import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import type { EditorProps } from '@toast-ui/react-editor';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import type { MutableRefObject } from 'react';

interface Editor extends EditorProps {
  editorRef: MutableRefObject<TuiEditor | null>;
}

const Editor = ({ editorRef, ...props }: Editor) => {
  return (
    <TuiEditor
      ref={editorRef}
      height='600px'
      plugins={[
        colorSyntax,
        [ codeSyntaxHighlight, { highlighter: Prism } ],
      ]}
      {...props}
    />
  );
};

export default Editor;
