import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

const githubLoginUrl = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}&redirect_url=${process.env.BASE_URL}/auth/callback`;

const GithubLoginButton = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleSignIn = () => {
    const redirectPath = router.asPath;
    router.push(`${githubLoginUrl}&state=${redirectPath}`);
  };

  return (
    <button onClick={handleSignIn}>
      {children}
    </button>
  );
};

export default GithubLoginButton;
