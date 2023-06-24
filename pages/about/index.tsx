import { parseMarkdownToHTML } from '@/lib/parse-markdown';
import fs from 'fs/promises';

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
