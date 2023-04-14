import type { PropsWithChildren } from 'react';
import Gnb from './gnb';

type LayoutProps = {
  showGnb?: boolean,
};

const Layout = ({ children, showGnb = true }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      {showGnb && <Gnb />}
      <div className="max-w-2xl h-full m-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;
