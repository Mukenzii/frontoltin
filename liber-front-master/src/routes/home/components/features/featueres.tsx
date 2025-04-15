import { useTranslation } from 'next-i18next';
import { Grid } from '@mui/material';
import ApproveIcon from 'components/icons/approve.icon';
import EnergyIcon from 'components/icons/energy.icon';
import StarIcon from 'components/icons/star.icon';
import ThumbUpIcon from 'components/icons/thumb-up.icon';
import React from 'react';
import FeatureItem from './feature-item';

const Features = () => {
  const { t } = useTranslation();
  const features = [
    {
      title: t('advantages1'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      Icon: EnergyIcon,
    },
    {
      title: t('advantages2'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      Icon: ApproveIcon,
    },
    {
      title: t('advantages3'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      Icon: ThumbUpIcon,
    },
    {
      title: t('advantages4'),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      Icon: StarIcon,
    },
  ];
  return (
    <Grid container sx={{ margin: '3rem 0' }}>
      {features.map((feature) => (
        <Grid item sm={12} lg={3} md={6} key={feature.title}>
          <FeatureItem {...feature} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Features;
