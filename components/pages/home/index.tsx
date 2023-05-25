import Link from 'next/link';

const Home = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-full flex flex-col justify-center items-center">
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
