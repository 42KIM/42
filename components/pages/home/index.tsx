import Link from 'next/link';

const Home = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-full flex flex-col justify-center items-center gap-4">
      <Link href="/about">
        <div className="hover:scale-125 hover:text-blue-400">ABOUT</div>
      </Link>
      <Link href="/posts">
        <div className="hover:scale-125 hover:text-blue-400">POSTS</div>
      </Link>
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
