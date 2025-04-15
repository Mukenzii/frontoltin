import { Box, Paper, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { SyntheticEvent, useRef, useState } from 'react';
import { Input } from 'components/input';
import { get } from 'lodash';
import { UserDetails } from 'types/user.types';
import { useFillWallet } from 'services/mutate/fill-wallet';
import { CardBox, ImageBox } from './styles/sub.style';
import WalletPng from '../../../assets/png/wallett.png';
import PaymePng from '../../../assets/png/payme2.png';
import ClickPng from '../../../assets/png/click.png';
import { Title } from './styles/tabs-title.style';

const Wallet: React.FC<{ isMobile?: boolean; data?: UserDetails }> = ({
  isMobile,
  data,
}) => {
  const { t } = useTranslation();
  const [selectedPayment, setSelectedPayment] = useState('');
  const { mutate } = useFillWallet();
  const amountRef = useRef();
  const handleFillPayment = (event: SyntheticEvent) => {
    event.preventDefault();
    mutate(
      {
        transaction_type: selectedPayment,
        price: get(amountRef, 'current.value'),
      },
      {
        onSuccess: (response) => {
          window.location.assign(response?.generated_link);
        },
      }
    );
  };
  return (
    <Paper sx={{ padding: '32px' }}>
      <Title>{t('e-wallet')}</Title>
      <CardBox bgColor="#3F51B5" minHeight={98}>
        <ImageBox topBottom="bottom">
          <Image src={WalletPng} alt="girl" />
        </ImageBox>
        <Box sx={{ padding: '26px' }}>
          <Typography
            variant="subtitle1"
            sx={{ color: '#ffffffb8', marginBottom: '12px' }}
          >
            Баланс
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize="1rem"
            fontWeight={700}
            sx={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700 }}
          >
            {Number(data?.balance).toLocaleString()} сўм
          </Typography>
        </Box>
      </CardBox>
      {selectedPayment ? (
        <form onSubmit={handleFillPayment}>
          <Box sx={{ marginTop: '35px', width: !isMobile ? '350px' : '100%' }}>
            <Input
              label="Сумма"
              placeholder="Сум"
              sx={{ width: '100%' }}
              name="amount"
              inputRef={amountRef}
            />
            <br />
            <Button
              variant="contained"
              sx={{ minHeight: '44px', marginTop: '35px' }}
              fullWidth
              type="submit"
            >
              {t('filling')}
            </Button>
          </Box>
        </form>
      ) : (
        <>
          <Button
            variant="outlined"
            fullWidth
            sx={{ minHeight: '61px', marginTop: '36px' }}
            onClick={() => setSelectedPayment('payme')}
          >
            <Image src={PaymePng} alt="payme" />
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ minHeight: '61px', marginTop: '36px' }}
            onClick={() => setSelectedPayment('click')}
          >
            <Image src={ClickPng} alt="Click" />
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Wallet;
