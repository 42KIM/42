import { APIService } from '@/apis';
import { accessCookieAtom, parseAccessCookie } from '@/lib/access-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthCallback = () => {
  const { push, query } = useRouter();
  const setAccessCookie = useSetRecoilState(accessCookieAtom);
  useEffect(() => {
    if (!query.code) return;

    const login = async () => {
      await APIService.createToken({ code: query.code });
      const accessCookie = parseAccessCookie();
      setAccessCookie(accessCookie);
      // TODO - destination으로 돌려보내기
      push('/');
    };

    login();
  }, [ query.code, push, setAccessCookie ]);

  return <div>Authentication Processing...</div>;
};

export default AuthCallback;

AuthCallback.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};
