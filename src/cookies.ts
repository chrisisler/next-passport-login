import { NowResponse, NowRequest } from '@vercel/node';
import { serialize, parse } from 'cookie';

/** Eight hours */
const maxAge = 60 * 60 * 8;
const cookieKey = 'next-passport-login-cookie-key';

export const setCookie = (value: string, res: NowResponse): void => {
  const expires = new Date(Date.now() + maxAge * 1000);
  const cookie = serialize(cookieKey, value, {
    maxAge,
    expires,
    secure: false,
    httpOnly: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
  res.setHeader('Set-Cookie', cookie);
};

export const unsetCookie = (res: NowResponse): void => {
  const cookie = serialize(cookieKey, '', { maxAge: -1, path: '/' });
  res.setHeader('Set-Cookie', cookie);
};

export const getCookie = <R extends NowRequest>(req: R): string | undefined => {
  const cookies = req.cookies ? req.cookies : parse(req.headers?.cookie ?? '');
  const cookie = cookies[cookieKey];
  return cookie;
};
