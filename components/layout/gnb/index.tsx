import { APIService } from '@/apis';
import { accessCookieAtom } from '@/lib/access-cookie';
import { useIsSignedIn, useUser } from '@/lib/auth.service';
import Image from 'next/image';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import githubLogo from '@/public/github-mark-white.svg';
import GithubLoginButton from '@/components/common/GithubLoginButton';

type Menu = {
  name: string,
  path: string,
  adminOnly: boolean,
};

export const menus: Menu[] = [
  {
    name: 'Home',
    path: '/',
    adminOnly: false,
  },
  {
    name: 'About',
    path: '/about',
    adminOnly: false,
  },
  {
    name: 'Posts',
    path: '/posts',
    adminOnly: false,
  },
  {
    name: '글쓰기',
    path: '/posts/create',
    adminOnly: true,
  },
];

const Gnb = () => {
  const user = useUser();
  const isSignedIn = useIsSignedIn();
  const setAccessCookie = useSetRecoilState(accessCookieAtom);

  const handleSignOut = async () => {
    await APIService.signOut();
    setAccessCookie(null);
  };

  return (
    <header className="sticky z-30 top-0 flex h-20 justify-center bg-blue-200">
      <div className="flex w-full max-w-2xl justify-between p-5">
        <div className="flex items-center gap-10">
          {menus.map(({ name, path, adminOnly }) => {
            if (!adminOnly || (adminOnly && user?.isAdmin)) {
              return (
                <Link key={name} href={path}>
                  <span className='text-white hover:text-blue-500'>{name}</span>
                </Link>
              );
            }
          })}
        </div>
        <div className='flex items-center gap-2'>
          <Image src={githubLogo} alt='login' width={18} />
          {user
            ? <span className='text-sm text-white'>{user.login}</span>
            : (
              <GithubLoginButton>
                <span className='text-sm text-white'>Login with Github</span>
              </GithubLoginButton>
            )
          }
          {isSignedIn && <button className='text-sm text-white' onClick={handleSignOut}>로그아웃</button>}
        </div>
      </div>
    </header>
  );
};

export default Gnb;
