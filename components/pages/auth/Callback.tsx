import { APIService } from '@/apis';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthCallback = () => {
  const { push, query } = useRouter();

  useEffect(() => {
    if (!query.code) return;

    const getToken = async () => {
      await APIService.createToken({ code: query.code });
      push('/');
    };
    getToken();
  }, [ query.code, push ]);

  return <div>Authentication Processing...</div>;
};

export default AuthCallback;

AuthCallback.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};
