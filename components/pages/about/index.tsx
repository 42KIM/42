type AboutProps = {
  content: string,
};

const About = ({ content }: AboutProps) => {
  return (
    <div className="prose prose-sm prose-p:my-1 prose-hr:my-5 prose-ul:my-1" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

About.getPageProps = () => {
  return {
    pageTitle: 'About',
  };
};

export default About;
