import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { APIService } from '@/apis';
import { useDialog } from '@/lib/use-dialog';

const isValidString = (state: string | string[] | undefined): state is string => typeof state === 'string';

const AuthCallback = () => {
  const { push, query } = useRouter();
  const { showErrorDialog } = useDialog();

  useEffect(() => {
    if (!query.code) return;

    const login = async () => {
      if (!isValidString(query.code)) return;

      await APIService.createToken({ code: query.code });

      const redirectPath = query.state || '/';
      push(isValidString(redirectPath) ? redirectPath : '/');
    };

    try {
      login();
    } catch (error) {
      showErrorDialog(error);
    }
  }, [ query, push, showErrorDialog ]);

  return <div>Authentication Processing...</div>;
};

export default AuthCallback;

AuthCallback.getLayoutProps = () => {
  return {
    showGnb: false,
  };
};
