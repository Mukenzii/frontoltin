import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Main from 'layouts/main';
import UserProfile from 'routes/profile';
import Router, { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { get } from 'lodash';
import { isAuthenticated } from 'services/AuthService';

const Profile = () => {
  const { query } = useRouter();
  const guid = get(query, 'guid') as string;
  useEffect(() => {
    if (Object.keys(isAuthenticated()).length === 0) {
      Router.push('/login');
    }
  }, [guid]);

  return (
    <Main>
      <Head>
        <title>User Profile</title>
      </Head>
      <UserProfile {...{ guid }} />
    </Main>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
export default Profile;
