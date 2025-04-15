import { Skeleton } from '@mui/material';
import React from 'react';

const CategorySkeleton = () => (
  <Skeleton
    variant="rectangular"
    animation="wave"
    width="200px"
    height="164px"
    sx={{ borderRadius: '14px' }}
  />
);

export default CategorySkeleton;
