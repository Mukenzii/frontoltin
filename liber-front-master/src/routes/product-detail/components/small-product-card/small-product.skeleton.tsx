import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const SmallProductCardSkeleton = ({
  relatedBook,
}: {
  relatedBook?: boolean;
}) => (
  <Stack direction="row">
    <Skeleton
      animation="wave"
      variant="rectangular"
      width="120px"
      height="170px"
      sx={{ borderRadius: '12px' }}
    />
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        width: relatedBook ? '40%' : '65%',
        marginLeft: relatedBook ? 3 : 5,
      }}
    >
      <Skeleton
        animation="wave"
        width={relatedBook ? '100%' : '70%'}
        height={30}
      />
      <Skeleton
        animation="wave"
        width={relatedBook ? '60%' : '30%'}
        height={30}
      />
      <Skeleton
        animation="wave"
        width={relatedBook ? '80%' : '50%'}
        height={30}
      />
      <Skeleton
        animation="wave"
        width={relatedBook ? '50%' : '20%'}
        height={30}
      />
    </Stack>
  </Stack>
);

export default SmallProductCardSkeleton;
