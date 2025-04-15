import { Stack, Typography } from '@mui/material';
import React from 'react';
import { IconType } from 'types/utility.types';
import { IconWrapper } from './features.styles';

interface FeatereItemProps {
  title: string;
  description: string;
  Icon: IconType;
}

const FeatureItem: React.FC<FeatereItemProps> = ({
  title,
  description,
  Icon,
}) => (
  <Stack
    gap="3rem"
    direction="row"
    sx={(theme) => ({
      [theme.breakpoints.down('md')]: { margin: '10px auto' },
    })}
  >
    <IconWrapper>
      <Icon />
    </IconWrapper>
    <Stack gap="0.5rem">
      <Typography variant="h6">{title}</Typography>
      <Typography color="#AAAAAA;" variant="caption">
        {description}
      </Typography>
    </Stack>
  </Stack>
);

export default FeatureItem;
