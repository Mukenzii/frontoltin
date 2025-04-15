import Main from 'layouts/main';
import { NextPage } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoginRoute from 'routes/login';
import { loadState } from '../utils/storage';

const Login: NextPage = () => {
  const { pathname } = useRouter();
  const user = loadState('user');
  useEffect(() => {
    if (pathname === '/login' && user)
      Router.push(`/profile/${user?.guid}?activeTab=2`);
  }, [pathname]);
  return (
    <Main>
      <Head>
        <title>Login</title>
      </Head>
      <LoginRoute />
    </Main>
  );
};

export default Login;
