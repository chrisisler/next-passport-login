import Head from 'next/head';
import { Container, Typography } from '@material-ui/core';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Container fixed maxWidth="sm">
      <Head>
        <title>next-passport-login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h5" style={{ margin: '2rem 0' }}>
        NextJS Login
      </Typography>
      <Component {...pageProps} />
    </Container>
  );
}
