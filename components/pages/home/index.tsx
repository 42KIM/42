import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Link href="/about">ABOUT</Link>
      <Link href="/posts">POSTS</Link>
    </div>
  );
};

Home.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};

Home.getPageProps = () => {
  return {
    pageTitle: 'Home',
  };
};

export default Home;
