import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { useVerify } from 'services/mutate/verify';
import { get } from 'lodash';
import { usePasswordResetCheck } from 'services/mutate/reset-password';
import { login } from 'services/AuthService';
// import OTPInput, { ResendOTP } from 'otp-input-react';
import { Input } from 'components/input';
import { Controller } from 'react-hook-form';
import CoutDown from './coutdown';
import { AuthTypes } from './auth.types';

const Verify = ({
  handleSubmit,
  watch,
  setStep,
  isForgotPasswordVerify,
  control,
}: {
  handleSubmit: any;
  setStep: any;
  watch: any;
  control: any;
  isForgotPasswordVerify: any;
}) => {
  const [code, setCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const useverify = useVerify();
  const { mutate, isLoading } = usePasswordResetCheck();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  useEffect(() => {
    if (code.length > 5) {
      setIsDisabled(true);
    }
  }, [code]);

  const handleVerificationSteps = () => {
    if (!isForgotPasswordVerify) {
      useverify.mutate(
        { otp: code, username: watch('reg_username') },
        {
          onSuccess: async () => {
            const LoginResponse = await login(
              watch('reg_username'),
              watch('reg_password')
            );
            if (LoginResponse) {
              toast.success('Success');
              Router.push(`/profile/${get(LoginResponse, 'guid')}`);
            }
          },
          onError: () => {
            toast.error('SMS kod xato kiritildi!');
          },
        }
      );
    } else {
      mutate(
        { confirm_code: code },
        {
          onSuccess: () => {
            toast.success('Success');
          },
        }
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(handleVerificationSteps)}>
      <Typography
        variant="h5"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          width: '100%',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        Телефонингизга юборилган кодни киритинг
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Controller
          control={control}
          name="otp"
          render={({ field }) => <Input {...field} />}
        />
        <CoutDown expiryTimestamp={time} />
        <Button
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          sx={{
            marginTop: '26px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {isLoading ? (
            <CircularProgress
              sx={{
                color: 'white',
              }}
              size={16}
            />
          ) : (
            'Тасдиклаш'
          )}
        </Button>
        <Button
          variant="text"
          fullWidth
          sx={{
            color: '#20AFFF',
            fontSize: '14px',
            fontWeight: 500,
            marginTop: '30px',
          }}
          type="button"
          onClick={() => setStep(1)}
        >
          Телефон рақамни ўзгартириш
        </Button>
      </Box>
    </form>
  );
};

export default Verify;
