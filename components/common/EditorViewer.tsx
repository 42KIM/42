import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Viewer as TuiViewer } from '@toast-ui/react-editor';

type EditorViewerProps = {
  content: string,
};

const EditorViewer = ({ content }: EditorViewerProps) => {
  return (
    <TuiViewer
      initialValue={content}
      plugins={[ [ codeSyntaxHighlight, { highlighter: Prism } ] ]}
    />
  );
};

export default EditorViewer;
