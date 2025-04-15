import React, { useState } from 'react';
import {
  Stack,
  Button,
  CircularProgress,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import { get } from 'lodash';
import { Input } from 'components/input';
import { login } from 'services/AuthService';
import Router, { useRouter } from 'next/router';
import * as yup from 'yup';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import Verify from 'routes/signup/components/verify';
import InputMaskPhone from 'routes/product-detail/components/payment/input-mask';
import { AuthTypes } from 'components/auth-modal/auth.types';
import wavePng from '../../assets/png/waveElement2.png';
import ForgotPassword from './components/forgot-password';
import NewPassword from './components/new-password';

const LoginRoute = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { query, asPath } = useRouter();
  const params = Object.keys(query)[0];
  const [accessToNewPassword, setAccessToNewPassword] = useState(false);
  const [isUseEmail, setIsUseEmail] = useState(false);
  const LoginSchema = yup.object({
    phoneNumber: !isUseEmail
      ? yup.string().required('Телефон рақам киритмадиз!').min(17)
      : yup.string(),
    email: isUseEmail
      ? yup.string().required('Email киритилмади!').email('Email киритилмади!')
      : yup.string(),
    password: yup.string().required('Парол киритмадиз!').min(1).max(16),
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  console.log(watch('phoneNumber'));
  const handleChange = async (values: AuthTypes) => {
    setIsLoading(true);
    try {
      const LoginResponse = await login(
        isUseEmail
          ? values?.email
          : get(values, 'phoneNumber')
              ?.substr(1, get(values, 'phoneNumber.length'))
              .replace(/\s/g, ''),
        values?.password
      );
      if (LoginResponse) {
        toast.success('Success');
        Router.push(`/profile/${get(LoginResponse, 'guid')}?activeTab=1`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Username ёки парол ҳато киритилди!');
      setIsLoading(false);
      // eslint-disable-next-line
      console.log(error);
    }
  };
  const handleRegisterPhoneOrEmail = () => {
    setIsUseEmail(!isUseEmail);
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 0, bottom: 0, zIndex: -1 }}>
        <Image src={wavePng} alt="wave" width={1000} height={800} />
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={(theme) => ({
            margin: '0 auto',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',

            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          })}
        >
          {asPath === '/login' && (
            <form
              onSubmit={handleSubmit(handleChange)}
              style={{ width: '400px' }}
            >
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
                Кириш
              </Typography>
              <Stack direction="column">
                {!isUseEmail ? (
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <InputMaskPhone
                        label="Телефон рақам"
                        {...{ field }}
                        value=""
                        helperText={errors?.phoneNumber?.message as string}
                      />
                    )}
                  />
                ) : (
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <Input
                        label="Email"
                        {...field}
                        placeholder="example@gmail.com"
                        sx={{ marginTop: '24px' }}
                        type="email"
                        helperText={errors?.email?.message as string}
                      />
                    )}
                  />
                )}
                <Stack alignItems="flex-end">
                  <Typography
                    variant="body2"
                    sx={{
                      borderBottom: '1px dashed #000',
                      width: 'fit-content',
                      marginTop: 1,
                      cursor: 'pointer',
                    }}
                    onClick={handleRegisterPhoneOrEmail}
                  >
                    <b>{!isUseEmail ? 'Email' : 'Телефон рақам'}</b> орқали
                    рўйҳатдан ўтиш
                  </Typography>
                </Stack>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      sx={{ marginTop: '10px' }}
                      type="password"
                      placeholder="***********"
                      label="Паролни киритинг"
                      labelsize={14}
                      {...field}
                      helperText={errors?.password?.message as string}
                    />
                  )}
                />
                <Typography
                  fontSize={14}
                  textAlign="right"
                  onClick={() => Router.push('/login?forget-password')}
                  sx={{ cursor: 'pointer', marginTop: '15px', zIndex: 9 }}
                >
                  Паролни унутдингизми?
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    marginTop: '20px',
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
                    'Кириш'
                  )}
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  type="button"
                  sx={{
                    marginTop: '15px',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                  onClick={() => Router.push('/sign-up')}
                >
                  Руйхатдан утиш
                </Button>
              </Stack>
            </form>
          )}
          {params === 'forget-password' && <ForgotPassword />}
          {params === 'verify' && (
            <Verify
              {...{ handleSubmit, watch, setAccessToNewPassword, control }}
              isForgotPasswordVerify
            />
          )}
          {params === 'new-password' && accessToNewPassword && <NewPassword />}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginRoute;
