import Main from 'layouts/main';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import Head from 'next/head';
/* eslint-disable import/no-unresolved */
import 'swiper/css';
/* eslint-disable import/no-unresolved */
import 'swiper/css/navigation';
/* eslint-disable import/no-unresolved */
import 'swiper/css/pagination';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomeRoute: any = dynamic(() => import('routes/home'));

const Home: NextPage = () => (
  <Main>
    <Head>
      <title>Home Page</title>
    </Head>
    <HomeRoute />
  </Main>
);
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default Home;
