import Image from 'next/image';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import WavePng from 'assets/png/waveElement3.png';
import { useTranslation } from 'next-i18next';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { FormatterDateExpired, FormatterDateToday } from 'utils/formatDate';
import { useRouter } from 'next/router';
import { UserDetails } from 'types/user.types';
import { useSubscriptionList } from 'services/api/use-subscription';
import GirlPng from 'assets/png//hero2.png';
import { SelectAsync, ReactSelect } from 'components/select';
import { useSubscription } from 'services/mutate/subscription';
import SubscriptionList from '../components/subscription-list';
import {
  CardBox,
  CustomBox,
  Flex,
  ImageBox,
  CardTitle,
} from './styles/sub.style';
import { Title } from './styles/tabs-title.style';

const Subscription: React.FC<{
  isMobile?: boolean;
  userData?: UserDetails;
}> = ({ isMobile, userData }) => {
  const { t } = useTranslation();
  const currentDate = FormatterDateToday();
  const { locale } = useRouter();
  const { data, isSuccess, refetch } = useSubscriptionList();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedPeriodTime, setSelectedPeriodTime] = useState(null as any);
  const expiredDate = FormatterDateExpired(get(selectedPeriodTime, 'days'));
  const { mutate, isLoading } = useSubscription();
  const handleSubmit = () => {
    mutate(
      {
        category: get(selectedCategory, 'guid'),
        category_type: get(selectedPeriodTime, 'guid'),
      },
      {
        onSuccess: () => {
          toast.success('Обуна фаоллаштирилди!');
          refetch();
        },
        onError: () => {
          toast.warn('Ушбу обунага сиз аллақачон аьзо бўлгансиз!');
        },
      }
    );
  };
  return (
    <>
      <CardBox bgColor="#ff7f4d" minHeight={176}>
        <CardTitle>{t('subscription3')}</CardTitle>
        <ImageBox topBottom="top">
          {!isMobile && <Image src={WavePng} alt="wave" />}
          {!isMobile && <Image src={GirlPng} alt="girl" />}
        </ImageBox>
      </CardBox>

      <Paper
        sx={{
          padding: isMobile ? '20px' : '32px 32px 70px 32px',
          marginTop: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Title>{t('subscription1.button')}</Title>
        <Flex direction={!isMobile ? 'row' : 'column'}>
          <Box sx={{ width: !isMobile ? '50%' : '100%' }}>
            <SelectAsync
              label={t('ruknlar')}
              placeholder={t('select-category')}
              optionLabel={`title_${locale}`}
              optionValue="guid"
              loadUrl="category/list/"
              onchange={(item) => {
                setSelectedCategory(item);
                setSelectedPeriodTime(null);
              }}
            />
            <ReactSelect
              label={t('subscription-expiretion')}
              placeholder={t('select-expired')}
              optionLabel="days"
              optionValue="guid"
              onchange={(item) => setSelectedPeriodTime(item)}
              options={get(selectedCategory, 'category_types')}
              isDisabled={Object.keys(selectedCategory).length === 0}
              value={selectedPeriodTime}
            />

            {get(selectedPeriodTime, 'days') && (
              <Typography
                variant="h6"
                sx={{
                  marginTop: '30px',
                  fontWeight: 500,
                }}
              >
                {t('subscription')} {get(selectedPeriodTime, 'days')}{' '}
                {t('day-expired')}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: !isMobile ? '45%' : '100%', mt: isMobile ? 2 : 0 }}>
            <CustomBox {...{ isMobile }}>
              <Flex>
                <Typography variant="subtitle1">
                  {t('begin-subscription-time')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontSize="1rem"
                  fontWeight={700}
                >
                  {currentDate}
                </Typography>
              </Flex>
              <Flex>
                <Typography variant="subtitle1">
                  {t('end-subscription-time')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontSize="1rem"
                  fontWeight={700}
                >
                  {expiredDate.includes('NaN') ? '**/**/****' : expiredDate}
                </Typography>
              </Flex>
              <Flex>
                <Typography variant="subtitle1">
                  {t('subscription-price')}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontSize="1rem"
                  fontWeight={700}
                  sx={{ color: '#3F51B5' }}
                >
                  {get(selectedPeriodTime, 'price') === undefined
                    ? 0
                    : Math.floor(
                        get(selectedPeriodTime, 'price')
                      ).toLocaleString()}{' '}
                  сўм
                </Typography>
              </Flex>
            </CustomBox>
            <Button
              variant="contained"
              size="large"
              sx={{ width: '100%', marginTop: '24px', minHeight: '44px' }}
              type="button"
              disabled={
                Math.floor(Number(get(userData, 'balance', 0))) <
                  Math.floor(Number(get(selectedPeriodTime, 'price'))) ||
                selectedPeriodTime === null
              }
              onClick={handleSubmit}
            >
              {isLoading ? (
                <CircularProgress
                  sx={{
                    color: 'white',
                  }}
                  size={16}
                />
              ) : (
                t('subscription1.button')
              )}
            </Button>
            {Math.floor(Number(get(userData, 'balance', 0))) <
              Math.floor(Number(get(selectedPeriodTime, 'price'))) && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                {t('alert-no-money')}
              </Alert>
            )}
          </Box>
        </Flex>
      </Paper>
      <Paper
        sx={{
          padding: isMobile ? '20px' : '32px 32px 70px 32px',
          marginTop: '24px',
          boxSizing: 'border-box',
        }}
      >
        <Title>{t('subscriptions')}</Title>
        <SubscriptionList {...{ data, isSuccess }} />
      </Paper>
    </>
  );
};

export default Subscription;
