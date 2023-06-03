import { APIService } from '@/apis';
import { accessCookieAtom, parseAccessCookie } from '@/lib/access-cookie';
import { useDialog } from '@/lib/use-dialog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const isValidPath = (state: string | string[] | undefined): state is string => typeof state === 'string';

const AuthCallback = () => {
  const { push, query } = useRouter();
  const setAccessCookie = useSetRecoilState(accessCookieAtom);
  const { showErrorDialog } = useDialog();

  useEffect(() => {
    if (!query.code) return;

    const login = async () => {
      await APIService.createToken({ code: query.code });

      const accessCookie = parseAccessCookie();
      const redirectPath = query.state || '/';

      setAccessCookie(accessCookie);
      push(isValidPath(redirectPath) ? redirectPath : '/');
    };

    try {
      login();
    } catch (error) {
      showErrorDialog(error);
    }
  }, [ query, push, setAccessCookie, showErrorDialog ]);

  return <div>Authentication Processing...</div>;
};

export default AuthCallback;

AuthCallback.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};
