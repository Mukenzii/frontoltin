import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { HeroCarousel } from '../carousel';
import { SwiperWrapper } from '../carousel/carousel.styles';
import { Subscription } from '../subscribe';
import { HeroWrapper } from './hero.styles';

const Hero: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const { t } = useTranslation('common');
  return (
    <Grid
      container
      columnGap="1.5rem"
      margin="1rem 0"
      width="100%"
      sx={{ minHeight: '400px' }}
    >
      <Grid item lg={9} md={8.7} width="100%" order={isMobile ? 2 : 1}>
        <HeroWrapper {...{ isMobile }}>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            sx={{ minHeight: '335px', maxHeight: '335px' }}
          >
            <Typography width={isMobile ? '100%' : '17rem'} variant="h5">
              {t('recommendationBooks')}
            </Typography>
            {!isMobile ? (
              <HeroCarousel />
            ) : (
              <SwiperWrapper>
                <HeroCarousel />
              </SwiperWrapper>
            )}
          </Stack>
        </HeroWrapper>
      </Grid>
      <Grid item lg={2.7} md={3} width="100%" order={isMobile ? 1 : 2}>
        <Subscription />
      </Grid>
    </Grid>
  );
};
export default Hero;
