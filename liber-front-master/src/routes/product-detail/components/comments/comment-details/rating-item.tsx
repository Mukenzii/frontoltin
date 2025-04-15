import { Stack, Typography } from '@mui/material';
import StarIcon from 'components/icons/star.icon';
import { COLORS } from 'config/styles-config';
import React from 'react';
import { RatingProgress } from './comment-detail.styles';

interface RatingItemProps {
  value: number;
  title: number;
}

const RatingItem: React.FC<RatingItemProps> = ({ value, title }) => (
  <Stack justifyContent="center" alignItems="center" gap="14px" direction="row">
    <Stack
      justifyContent="center"
      alignItems="center"
      gap="6px"
      direction="row"
    >
      <StarIcon width={12} color={COLORS.secondary} />
      <Typography fontWeight={700} variant="caption">
        {title}
      </Typography>
    </Stack>
    <RatingProgress value={value} />
    <Typography fontWeight={700} variant="caption">
      {value}%
    </Typography>
  </Stack>
);

export default RatingItem;
