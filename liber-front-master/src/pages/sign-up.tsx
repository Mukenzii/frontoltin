import Main from 'layouts/main';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import SignUpRoute from 'routes/signup';

const SignUp: NextPage = () => (
  <Main>
    <Head>
      <title>Sign Up</title>
    </Head>
    <SignUpRoute />
  </Main>
);

export default SignUp;
