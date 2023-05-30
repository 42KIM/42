import { parseMarkdown } from '@/lib/parse-markdown';
import fs from 'fs/promises';

export { default } from '@/components/pages/about';

export const getStaticProps = async () => {
  const resumeMarkdown = await fs.readFile('resume.md', 'utf-8');
  const resumeHTML = parseMarkdown(resumeMarkdown);

  return {
    props: {
      content: resumeHTML,
    },
  };
};
