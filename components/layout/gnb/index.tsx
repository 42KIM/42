import { APIService } from '@/apis';
import { accessCookieAtom } from '@/lib/access-cookie';
import { useIsSignedIn, useUser } from '@/lib/auth.service';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

type Menu = {
  name: string,
  path: string,
  adminOnly: boolean,
};

const githubLoginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}&redirect_url=http://localhost:3000/auth/callback`;

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

  const handleLogout = async () => {
    await APIService.signOut();
    setAccessCookie(null);
  };

  return (
    <header className="sticky top-0 w-screen flex h-20 justify-center bg-blue-200">
      <div className="flex w-full max-w-2xl justify-between p-5">
        <div className="flex items-center gap-10">
          {menus.map(({ name, path, adminOnly }) => {
            if (!adminOnly || (adminOnly && user?.isAdmin)) {
              return (
                <Link key={name} href={path}>
                  <span>{name}</span>
                </Link>
              );
            }
          })}
        </div>
        <div className='flex items-center gap-2'>
          {user
            ? <div>Hello, {user.login}!</div>
            : <a href={githubLoginUrl}>로그인</a>
          }
          {isSignedIn && <button onClick={handleLogout}>로그아웃</button>}
        </div>
      </div>
    </header>
  );
};

export default Gnb;
