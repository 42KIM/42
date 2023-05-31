import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('plaintext', plaintext);

export const renderer = {
  link(href: string, title: string, text: string) {
    return `<a class="hover:text-blue-400" target="_blank" href="${href}" title="${title || ''}">${text}</a>`;
  },
};

marked.use({
  mangle: false,
  headerIds: false,
  renderer,
});

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
}));

export const parseMarkdownToHTML = (markdown: string) => {
  return marked.parse(markdown);
};
