import { Container, useMediaQuery, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { useAudioBooks } from 'services/api/use-audio-books';
import { useNewBooks } from 'services/api/use-new-books';
import { Categories } from './components/categories';
import { Features } from './components/features';
import { Links } from './components/links';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hero: any = dynamic(() => import('./components/hero'));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCarousel: any = dynamic(
  () => import('./components/product-carousel')
);

const Home = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const audioBooks = useAudioBooks();
  const newBooks = useNewBooks();

  return (
    <>
      {!isMobile && <Links />}
      <Container maxWidth="lg">
        <Hero {...{ isMobile }} />
        <Features />
        <Categories />
        <ProductCarousel title={t('newBooks')} response={newBooks} />
        <ProductCarousel title={t('audioBooks')} response={audioBooks} />
      </Container>
    </>
  );
};

export default Home;
