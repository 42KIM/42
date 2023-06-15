import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { parseAccessCookie } from './access-cookie';
import { useEffect, useState } from 'react';
import { APIService } from '@/apis';
import { useDialog } from './use-dialog';

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
  const setUser = useSetRecoilState(userAtom);
  const { showErrorDialog } = useDialog();

  useEffect(() => {
    if (parsedAccessCookie === null) return;

    const initUser = async () => {
      try {
        const user = await APIService.getUser();
        setUser(user);
      } catch (error) {
        showErrorDialog(error);
      }
    };

    initUser();
  }, [ parsedAccessCookie, setUser, showErrorDialog ]);
};
