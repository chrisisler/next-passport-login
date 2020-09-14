import { getCookie } from '../../src/cookies';
import { NowRequest, NowResponse } from '@vercel/node';

export default (req: NowRequest, res: NowResponse) => {
  const user = getCookie(req);
  res.status(200).json({ user });
};
