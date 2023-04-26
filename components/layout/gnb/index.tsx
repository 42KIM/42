import { APIService } from '@/apis';
import { accessCookieAtom } from '@/lib/access-cookie';
import { useIsSignedIn, useUser } from '@/lib/auth.service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import githubLogo from '@/public/github-mark-white.svg';

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
  const router = useRouter();
  const user = useUser();
  const isSignedIn = useIsSignedIn();
  const setAccessCookie = useSetRecoilState(accessCookieAtom);

  const handleSignIn = () => {
    const redirectPath = router.asPath;
    router.push(`${githubLoginUrl}&state=${redirectPath}`);
  };

  const handleSignOut = async () => {
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
          <Image src={githubLogo} alt='login' width={18} />
          {user ?
            <span className='text-sm text-white'>{user.login}</span> :
            <button onClick={handleSignIn}>
              <span className='text-sm text-white'>Login with Github</span>
            </button>
          }
          {isSignedIn && <button className='text-sm text-white' onClick={handleSignOut}>로그아웃</button>}
        </div>
      </div>
    </header>
  );
};

export default Gnb;
