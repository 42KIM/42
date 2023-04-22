import type { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance as _request } from '@/lib/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { code } = req.body;

    const { data: accessToken } = await _request({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: String(code),
      },
    });

    const parsedToken = accessToken.split('&')[0].split('=')[1];

    const { data: userInfo } = await _request({
      method: 'GET',
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    });
    console.log(userInfo);
    //TODO - save token
    //TODO - save user

    res.status(200).end();
  }
}
