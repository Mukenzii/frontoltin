import { Skeleton } from '@mui/material';
import React from 'react';
import { ProductCardWrapper } from '../product-card/product-card.styles';

const HeroSkeleton = () => (
  <ProductCardWrapper>
    <Skeleton
      animation="wave"
      variant="rectangular"
      width="100%"
      height="267px"
      sx={(theme) => ({
        borderRadius: '14px',
        [theme.breakpoints.down('md')]: { height: '200px!important' },
      })}
    />
    <Skeleton
      animation="wave"
      sx={{ marginTop: '18px' }}
      width="80%"
      height={30}
    />
  </ProductCardWrapper>
);

export default HeroSkeleton;
