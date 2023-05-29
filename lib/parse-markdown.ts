import { marked } from 'marked';

const renderer = {
  link(href: string, title: string, text: string) {
    return `<a class="hover:text-blue-400" target="_blank" href="${href}" title="${title || ''}">${text}</a>`;
  },
};

marked.use({ renderer });

export const parseMarkdown = (markdown: string) => {
  return marked(markdown);
};
