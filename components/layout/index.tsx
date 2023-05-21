import type { PropsWithChildren } from 'react';
import Gnb from './gnb';
import { useAuthentication } from '@/lib/auth.service';
import { ToastBaseComponent } from '../common/Toast';

type LayoutProps = {
  showGnb?: boolean,
};

const Layout = ({ children, showGnb = true }: PropsWithChildren<LayoutProps>) => {
  useAuthentication();

  return (
    <>
      {showGnb && <Gnb />}
      <main className="max-w-2xl min-h-[calc(100%-80px)] m-auto px-5 py-4">
        {children}
      </main>
      <ToastBaseComponent />
    </>
  );
};

export default Layout;
