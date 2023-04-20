import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Viewer } from '@toast-ui/react-editor';

const TuiViewer = ({ content }) => {
  return (
    <Viewer
      initialValue={content}
      plugins={[ [ codeSyntaxHighlight, { highlighter: Prism } ] ]}
    />
  );
};

export default TuiViewer;
