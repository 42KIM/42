type AboutProps = {
  content: string,
};

const vercel = process.env.VERCEL;
const env = process.env.VERCEL_ENV;

const About = ({ content }: AboutProps) => {
  console.log('vercel: ', vercel, typeof vercel, 'env: ', env);
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
