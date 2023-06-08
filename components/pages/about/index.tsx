import Viewer from '@/components/common/Viewer';

type AboutProps = {
  content: string,
};

const About = ({ content }: AboutProps) => {
  return (
    <Viewer html={content} />
  );
};

About.getPageProps = () => {
  return {
    pageTitle: 'About',
  };
};

export default About;
