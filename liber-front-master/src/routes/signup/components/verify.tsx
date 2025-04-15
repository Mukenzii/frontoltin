import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { usePasswordResetCheck } from 'services/mutate/reset-password';
import { get } from 'lodash';
import Link from 'next/link';
import { login } from 'services/AuthService';
import NewUserDetailsContext from 'context/auth';
import CustomOtpInput from 'components/otp-input';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useVerify } from 'services/mutate/verify';
import CoutDown from '../../../components/auth-modal/coutdown';

const Verify = ({
  isForgotPasswordVerify,
  setAccessToNewPassword,
}: {
  isForgotPasswordVerify: boolean;
  setAccessToNewPassword: any;
}) => {
  const { newUserDetails } = useContext(NewUserDetailsContext);
  const useverify = useVerify();
  const { query } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [otp, setOtp] = useState('');
  const { mutate, isLoading } = usePasswordResetCheck();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const handleVerificationSteps = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isForgotPasswordVerify) {
      useverify.mutate(
        { otp, username: get(newUserDetails, 'username') },
        {
          onSuccess: async () => {
            const LoginResponse = await login(
              get(newUserDetails, 'username'),
              get(newUserDetails, 'password')
            );
            if (LoginResponse) {
              toast.success('Муваффақиятли');
              Router.push(`/profile/${get(LoginResponse, 'guid')}?activeTab=1`);
            }
          },
          onError: () => {
            toast.error('SMS код хато киритилди!');
          },
        }
      );
    } else {
      mutate(
        { username: get(query, 'username'), confirm_code: otp },
        {
          onSuccess: () => {
            toast.success('Success');
            Router.push(
              `/login?new-password&username=${get(query, 'username')}`
            );
            setAccessToNewPassword(true);
          },
          onError: () => {
            toast.error('Error');
          },
        }
      );
    }
  };

  return (
    <Paper
      sx={(theme) => ({
        padding: '40px 120px',
        [theme.breakpoints.down('md')]: {
          width: '100%',
          padding: 4,
        },
      })}
    >
      <form
        onSubmit={handleVerificationSteps}
        style={{ width: isMobile ? '100%' : '400px' }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
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
            mt: 4,
          }}
        >
          <CustomOtpInput
            value={otp}
            numInputs={6}
            onChange={setOtp}
            shouldAutoFocus
            isInputNum
            hasErrored
          />
          <CoutDown expiryTimestamp={time} />
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            disabled={get(otp, 'length') < 6}
            fullWidth
            sx={{
              marginTop: '26px',
              padding: '14px',
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
              'Тасдиқлаш'
            )}
          </Button>
          <Link href="/sign-up">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
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
              >
                Телефон рақамни ўзгартириш
              </Button>
            </a>
          </Link>
        </Box>
      </form>
    </Paper>
  );
};

export default Verify;
