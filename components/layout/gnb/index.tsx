import Link from 'next/link';
import { menus } from './menus';

const Gnb = () => {
  return (
    <header className="h-20 flex justify-center bg-blue-200">
      <div className="w-full max-w-2xl flex justify-between">
        <div className="flex gap-10 items-center">
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
