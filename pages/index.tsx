import Head from 'next/head';
import { Typography } from '@material-ui/core';

enum Pad {
  XSmall = '0.25rem',
  Small = '0.5rem',
  Medium = '1rem',
  Large = '2rem',
  XLarge = '3rem',
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>next-passport-login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h5" style={{ margin: `${Pad.Medium} 0` }}>
        Hello there
      </Typography>
    </div>
  );
}
