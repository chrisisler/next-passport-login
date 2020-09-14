import { Grid, Typography, Button } from '@material-ui/core';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useUser } from '../src/hooks';
import { DataState } from '../src/DataState';

const requests = {
  login: '/api/login',
  logout: '/api/logout',
};

export default function App() {
  const [user, setUser] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (DataState.isEmpty(user)) router.push('/');
  }, [user]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            fetch(requests.logout, {
              credentials: 'same-origin',
            })
              .then(res => {
                if (!res.ok) throw Error(res.statusText);
                setUser(DataState.Empty);
              })
              .catch(error => {
                console.error(error.message);
              })
          }
        >
          Log out
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="body2">You are in!</Typography>
      </Grid>
    </Grid>
  );
}
