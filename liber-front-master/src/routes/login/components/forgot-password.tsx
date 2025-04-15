import React, { useState } from 'react';
import { usePasswordReset } from 'services/mutate/reset-password';
import InputMaskPhone from 'routes/product-detail/components/payment/input-mask';
import { Stack, Button, CircularProgress, Typography } from '@mui/material';
import { Input } from 'components/input';
import { get } from 'lodash';
import Router from 'next/router';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { mutate, isLoading } = usePasswordReset();
  const [isUseEmail, setIsUseEmail] = useState(false);
  const [username, setUsername] = useState('');
  const handleChangeForgotPassword = (event: any) => {
    event.preventDefault();
    mutate(
      {
        username: isUseEmail
          ? username
          : username?.substr(1, get(username, 'length')).replace(/\s/g, ''),
      },
      {
        onSuccess: () => {
          Router.push(
            `/login?verify&username=${
              isUseEmail
                ? username
                : username
                    ?.substr(1, get(username, 'length'))
                    .replace(/\s/g, '')
            }`
          );
        },
        onError: () => {
          toast.error('Username ёки парол ҳато киритилди!');
        },
      }
    );
  };
  const handleRegisterPhoneOrEmail = () => {
    setIsUseEmail(!isUseEmail);
  };
  return (
    <form onSubmit={handleChangeForgotPassword} style={{ width: '400px' }}>
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
        Паролни тиклаш
      </Typography>
      <Stack direction="column">
        {!isUseEmail ? (
          <InputMaskPhone
            label="Телефон рақам"
            onChange={(event: any) => setUsername(event.target.value)}
            forgotPassword
            value={username}
          />
        ) : (
          <Input
            label="Email"
            placeholder="example@gmail.com"
            sx={{ marginTop: '24px' }}
            type="email"
            onChange={(event: any) => setUsername(event.target.value)}
            // helperText={errors?.email?.message as string}
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
            <b>{!isUseEmail ? 'Email' : 'Телефон рақам'}</b>дан фойдаланиш
          </Typography>
        </Stack>
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
            'Жўнатиш'
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPassword;
