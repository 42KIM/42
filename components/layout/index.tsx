import type { PropsWithChildren } from 'react';
import Gnb from './gnb';

type LayoutProps = {
  showGnb?: boolean,
};

const Layout = ({ children, showGnb = true }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      {showGnb && <Gnb />}
      <main className="max-w-2xl h-full m-auto pt-20 px-5">
        {children}
      </main>
    </>
  );
};

export default Layout;
