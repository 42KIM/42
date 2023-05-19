import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { accessCookieAtom, parseAccessCookie } from './access-cookie';
import { useEffect, useState } from 'react';
import { APIService } from '@/apis';

export type User = {
  id: number,
  login: string,
  avatar_url: string,
  html_url: string,
  isAdmin: boolean,
};

export const isSignedInAtom = atom<boolean>({
  key: 'isSignedIn',
  default: false,
});

export const userAtom = atom<User | null>({
  key: 'user',
  default: null,
});

export const useUser = () => useRecoilValue<User | null>(userAtom);

export const useIsSignedIn = () => {
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    setIsSignedIn(user !== null);
  }, [ user ]);

  return isSignedIn;
};

export const useAuthentication = () => {
  const parsedAccessCookie = parseAccessCookie();
  const [ accessCookie, setAccessCookie ] = useRecoilState(accessCookieAtom);
  const [ user, setUser ] = useRecoilState(userAtom);

  useEffect(() => {
    if (parsedAccessCookie === null) {
      user && setUser(null);
      return;
    }
    if (user && (parsedAccessCookie === accessCookie)) return;

    setAccessCookie(parsedAccessCookie);

    const initUser = async () => {
      const user = await APIService.getUser();
      setUser(user);
    };
    initUser();
  }, [ parsedAccessCookie, accessCookie, user, setUser, setAccessCookie ]);
};
