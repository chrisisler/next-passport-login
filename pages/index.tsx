import { TextField, Grid, Button } from '@material-ui/core';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '../src/hooks';
import { DataState } from '../src/DataState';
import { User } from '../src/interfaces';

const requests = {
  login: '/api/login',
  logout: '/api/logout',
};

export default function Index() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [loginError, setLoginError] = useState(false);

  const [user, setUser] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (DataState.isReady(user)) router.push('/app');
  }, [user]);

  const login = async () => {
    const username = usernameInput?.current?.value;
    const password = passwordInput?.current?.value;
    if (!username || !password) return;
    try {
      const res = await fetch(requests.login, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      });
      if (!res.ok) throw Error(res.statusText);
      const { id } = await res.json();
      const loggedIn: User = { id, username, password };
      setUser(loggedIn);
    } catch (_) {
      setLoginError(true);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(requests.logout, {
        credentials: 'same-origin',
      });
      if (!res.ok) throw Error(res.statusText);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            fullWidth
            inputRef={usernameInput}
            variant="outlined"
            id="username-input"
            label="Username"
            onKeyDown={event => {
              if (event.key !== 'Enter') return;
              setLoginError(false);
              login();
            }}
            onBlur={() => setLoginError(false)}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            inputRef={passwordInput}
            variant="outlined"
            type="password"
            id="password-input"
            onKeyDown={event => {
              if (event.key !== 'Enter') return;
              setLoginError(false);
              login();
            }}
            label={
              loginError ? 'Invalid credentials (try admin/pass).' : 'Password'
            }
            error={!!loginError}
            onBlur={() => setLoginError(false)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%' }}
            onClick={login}
          >
            Log in
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%' }}
            onClick={logout}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
