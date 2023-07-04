import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('plaintext', plaintext);

export const renderer = {
  link(href: string, title: string, text: string) {
    return `<a class="hover:text-blue-400" target="_blank" href="${href}" title="${title || ''}">${text}</a>`;
  },
  codespan(code: string) {
    return `<code class="bg-gray-200 text-gray-800 rounded-md px-1 py-0.5">${code}</code>`;
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
