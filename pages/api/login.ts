import { NowResponse } from '@vercel/node';
import nc from 'next-connect';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { getDatabase } from '../../src/database';
import { User, AuthenticatedRequest } from '../../src/interfaces';
import { setCookie } from '../../src/cookies';

// Configure PassportJS authentication middleware
passport.use(
  new LocalStrategy((username, password, done) => {
    getDatabase()
      .then(db => {
        const found = db.users.find(u => u.username === username);
        if (!found || found.password !== password) return done(null, false);
        return done(null, found);
      })
      .catch(error => done(error));
  })
);

passport.serializeUser((user: User, done) => {
  done(null, user.id + '');
});

passport.deserializeUser((id, done) => {
  getDatabase()
    .then(db => {
      const found = db.users.find(u => u.id == id);
      if (!found) return done(null, false);
      return done(null, found);
    })
    .catch(error => done(error));
});

export default nc<AuthenticatedRequest, NowResponse>()
  .use(passport.initialize())
  .post(passport.authenticate('local'), (req, res) => {
    setCookie(JSON.stringify(req.user), res);
    res.status(200).json({ id: req.user.id });
  });
