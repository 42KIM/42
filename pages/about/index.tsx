import fs from 'fs/promises';
import { parseMarkdownToHTML } from '@/lib/parse-markdown';

export { default } from '@/components/pages/about';

export const getStaticProps = async () => {
  const resumeMarkdown = await fs.readFile('public/resume.md', 'utf-8');
  const resumeHTML = parseMarkdownToHTML(resumeMarkdown);

  return {
    props: {
      content: resumeHTML,
    },
  };
};
