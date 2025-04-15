import { Stack, Typography } from '@mui/material';
import HeartIcon from 'components/icons/heart.icon';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { loadState } from 'utils/storage';
import { SubscribeButton, SubscribeWrapper } from './subscribe.styles';

const Subscribe = () => {
  const user = loadState('user');
  const { t } = useTranslation();
  return (
    <SubscribeWrapper>
      <Stack justifyContent="space-between" height="100%" spacing={2}>
        <Stack gap="2rem">
          <Typography color="white" variant="h5">
            {t('subscription1.title')}
          </Typography>
          <Typography fontSize="18px" color="white">
            {t('subscription1.text')}
          </Typography>
        </Stack>
        <Link href={`/profile/${user?.guid}?activeTab=1`} passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <SubscribeButton startIcon={<HeartIcon />} size="large" fullWidth>
              {t('subscription1.button')}
            </SubscribeButton>
          </a>
        </Link>
      </Stack>
    </SubscribeWrapper>
  );
};

export default Subscribe;
