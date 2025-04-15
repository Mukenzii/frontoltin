import React, { useState } from 'react';
import { Stack, Button, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { get } from 'lodash';
import { Input } from 'components/input';
import { login } from 'services/AuthService';
import Router from 'next/router';
import { AuthTypes } from './auth.types';

const Login = ({
  setIsSignUp,
  control,
  handleSubmit,
  setIsForgotPassword,
}: {
  setIsSignUp: any;
  control: any;
  handleSubmit: any;
  setIsForgotPassword: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = async (data: AuthTypes) => {
    setIsLoading(true);
    try {
      const LoginResponse = await login(data?.username, data?.password);
      if (LoginResponse) {
        toast.success('Success');
        Router.push(`/profile/${get(LoginResponse, 'guid')}`);
        setIsLoading(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleChange)}>
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
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              sx={{ marginTop: '50px' }}
              label="Email ёки телефон рақами"
              labelsize={14}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              sx={{ marginTop: '20px' }}
              type="password"
              placeholder="***********"
              label="Паролни киритинг"
              labelsize={14}
              {...field}
            />
          )}
        />
        <Typography
          fontSize={14}
          textAlign="right"
          onClick={() => setIsForgotPassword(true)}
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
          onClick={() => setIsSignUp(true)}
        >
          Руйхатдан утиш
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
