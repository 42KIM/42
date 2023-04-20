import Link from 'next/link';

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
  //TODO - 인증 추가
  const isAdmin = true;

  return (
    <header className="absolute w-screen flex h-20 justify-center bg-blue-200">
      <div className="flex w-full max-w-2xl justify-between p-5">
        <div className="flex items-center gap-10">
          {menus.map(({ name, path, adminOnly }) => {
            if (!adminOnly || (adminOnly && isAdmin)) {
              return (
                <Link key={name} href={path}>
                  <span>{name}</span>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </header>
  );
};

export default Gnb;
