import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { APIService } from '@/apis';
import { parseAccessCookie } from './access-cookie';
import { useDialog } from './use-dialog';

export type User = {
  id: number,
  login: string,
  avatar_url: string,
  html_url: string,
  isAdmin: boolean,
};

export const userAtom = atom<User | null>({
  key: 'user',
  default: null,
});

export const useUser = () => useRecoilValue<User | null>(userAtom);

export const useIsSignedIn = () => Boolean(useRecoilValue(userAtom));

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
