import Main from 'layouts/main';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import FilterPage from 'routes/filter';

const Filter: NextPage = () => (
  <Main>
    <Head>
      <title>Filter</title>
    </Head>
    <FilterPage />
  </Main>
);
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});
export default Filter;
