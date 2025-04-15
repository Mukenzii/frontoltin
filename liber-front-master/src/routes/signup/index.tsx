import React, { useState } from 'react';
import {
  Container,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import Image from 'next/image';
import { Input } from 'components/input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Router, { useRouter } from 'next/router';
import * as yup from 'yup';
import { useRegister } from 'services/mutate/register';
import InputMaskPhone from 'routes/product-detail/components/payment/input-mask';
import { get } from 'lodash';
import { AuthTypes } from 'components/auth-modal/auth.types';
import wavePng from '../../assets/png/waveElement2.png';
import Verify from './components/verify';

const SignUpRoute = () => {
  const { query, asPath } = useRouter();
  const params = Object.keys(query)[0];
  const [isUseEmail, setIsUseEmail] = useState(false);
  const [accessToNewPassword, setAccessToNewPassword] = useState(false);
  const { mutate, isLoading } = useRegister();
  const RegisterSchema = yup.object({
    phoneNumber: !isUseEmail
      ? yup.string().required('Телефон рақам киритилмади!').min(17)
      : yup.string(),
    first_name: yup.string().required('Исм ва фамилия киритилмади!'),
    email: isUseEmail
      ? yup
          .string()
          .required('Email киритилмади!')
          .email('Email тўғри киритилмади!')
      : yup.string(),
    password: yup.string().required('Парол киритилмади!').min(6).max(16),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const handleRegister = async (values: AuthTypes) => {
    const value = {
      username: isUseEmail
        ? get(values, 'email')
        : get(values, 'phoneNumber')
            ?.substr(1, get(values, 'phoneNumber.length'))
            .replace(/\s/g, ''),
      first_name: values?.first_name,
      password: values?.password,
    };
    mutate(value, {
      onSuccess: async () => {
        Router.push(`sign-up?verify&username=${value?.username}`);
      },
    });
  };

  const handleRegisterPhoneOrEmail = () => {
    setIsUseEmail(!isUseEmail);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 0, bottom: 0, zIndex: -9 }}>
        <Image src={wavePng} alt="wave" width={1000} height={800} />
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={(theme) => ({
            margin: 'auto',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          })}
        >
          {asPath === '/sign-up' && (
            <form
              onSubmit={handleSubmit(handleRegister)}
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
                Руйхатдан ўтиш
              </Typography>
              <Stack direction="column">
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <Input
                      sx={{ marginTop: '50px', fontSize: '90px!important' }}
                      placeholder="Яхё Темиров"
                      label="Исм ва фамиля"
                      labelsize={14}
                      {...field}
                      helperText={errors?.firstName?.message as string}
                    />
                  )}
                />
                {!isUseEmail ? (
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <InputMaskPhone
                        label="Телефон рақам"
                        {...{ field }}
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
                      type="password"
                      placeholder="*********"
                      label="Паролни киритинг"
                      labelsize={14}
                      {...field}
                      helperText={errors?.password?.message as string}
                    />
                  )}
                />
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    marginTop: '35px',
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
                    'Руйхатдан ўтиш'
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
                  onClick={() => Router.push('/login')}
                >
                  Кириш
                </Button>
              </Stack>
            </form>
          )}
          {params === 'verify' && !accessToNewPassword && (
            <Verify
              {...{
                setAccessToNewPassword,
              }}
              isForgotPasswordVerify={false}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpRoute;
