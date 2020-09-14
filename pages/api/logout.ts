import nc from 'next-connect';
import passport from 'passport';
import { NowResponse } from '@vercel/node';

import { unsetCookie } from '../../src/cookies';

export default nc()
  .use(passport.initialize())
  .get((_, res: NowResponse) => {
    unsetCookie(res);
    res.writeHead(302, { Location: '/' });
    res.end();
  });
