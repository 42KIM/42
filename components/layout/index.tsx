import type { PropsWithChildren } from 'react';
import { useAuthentication } from '@/lib/auth.service';
import DialogBaseComponent from '../common/Dialog';
import Gnb from './gnb';

type LayoutProps = {
  showGnb?: boolean,
};

const Layout = ({ children, showGnb = true }: PropsWithChildren<LayoutProps>) => {
  useAuthentication();

  return (
    <>
      {showGnb && <Gnb />}
      <main className="max-w-2xl min-h-[calc(100vh-80px)] mx-auto px-5 py-4">
        {children}
      </main>
      <DialogBaseComponent />
    </>
  );
};

export default Layout;
