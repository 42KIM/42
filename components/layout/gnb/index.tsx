import Link from 'next/link';

type Menu = {
  name: string,
  path: string,
};

export const menus: Menu[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Posts',
    path: '/posts',
  },
];

const Gnb = () => {
  return (
    <header className="absolute w-screen flex h-20 justify-center bg-blue-200">
      <div className="flex w-full max-w-2xl justify-between p-5">
        <div className="flex items-center gap-10">
          {menus.map(({ name, path }) => (
            <Link key={name} href={path}>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Gnb;
