import fs from 'fs/promises';
import { marked } from 'marked';

export { default } from '@/components/pages/about';

export const getStaticProps = async () => {
  const resumeMarkdown = await fs.readFile('resume.md', 'utf-8');
  const resumeHTML = marked(resumeMarkdown);

  return {
    props: {
      content: resumeHTML,
    },
  };
};
