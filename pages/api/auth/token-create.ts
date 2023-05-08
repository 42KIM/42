import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance as _request } from '@/lib/axios';

const CLIENT_ID = process.env.NODE_ENV === 'development' && process.env.GITHUB_CLIENT_ID_DEVELOPMENT ||
  process.env.NODE_ENV === 'production' && process.env.GITHUB_CLIENT_ID_PRODUCTION;

const CLIENT_SECRET = process.env.NODE_ENV === 'development' && process.env.GITHUB_CLIENT_SECRET_DEVELOPMENT ||
  process.env.NODE_ENV === 'production' && process.env.GITHUB_CLIENT_SECRET_PRODUCTION;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { code } = req.body;

    const { data: accessToken } = await _request({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: String(code),
      },
    });

    const parsedToken = accessToken.split('&')[0].split('=')[1];

    // TODO - 쿠키 설정 (expire, secure, domain ...)
    res.setHeader('Set-Cookie', `token=${parsedToken}; path=/;`);
    res.status(200).end();
  }
}
