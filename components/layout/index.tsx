import type { PropsWithChildren } from 'react';
import Gnb from './gnb';
import { useAuthentication } from '@/lib/auth.service';

type LayoutProps = {
  showGnb?: boolean,
};

const Layout = ({ children, showGnb = true }: PropsWithChildren<LayoutProps>) => {
  useAuthentication();

  return (
    <>
      {showGnb && <Gnb />}
      <main className="max-w-2xl h-full m-auto pt-24 px-5">
        {children}
      </main>
    </>
  );
};

export default Layout;
