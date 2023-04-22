import { APIService } from '@/apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthCallback = () => {
  const { push, query } = useRouter();

  useEffect(() => {
    if (!query.code) return;

    const login = async () => {
      await APIService.createToken({ code: query.code });
      const userInfo = await APIService.getUser();
      // TODO - 글로벌 스토어로 유저 세션 관리
      // TODO - destination으로 돌려보내기
      push('/');
    };
    login();
  }, [ query.code, push ]);

  return <div>Authentication Processing...</div>;
};

export default AuthCallback;

AuthCallback.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};
