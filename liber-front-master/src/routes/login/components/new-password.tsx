import { Stack, Button, Typography, CircularProgress } from '@mui/material';
import { Input } from 'components/input';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNewPassword } from 'services/mutate/reset-password';

const NewPassword = () => {
  const { mutate, isLoading } = useNewPassword();
  const { query } = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: undefined,
  });
  const handleChange = (values: {
    new_password1?: string;
    new_password2?: string;
  }) => {
    mutate(
      {
        new_password1: values.new_password1,
        new_password2: values.new_password2,
        username: query?.username,
      },
      {
        onSuccess: () => {
          toast.success('Success');
          Router.push('/login');
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(handleChange)} style={{ width: '400px' }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          width: '100%',
          textAlign: 'center',
          margin: '0 auto',
          marginBottom: '2rem',
        }}
      >
        Паролни тиклаш
      </Typography>
      <Stack direction="column">
        <Controller
          control={control}
          name="new_password1"
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
        <Controller
          control={control}
          name="new_password2"
          render={({ field }) => (
            <Input
              sx={{ marginTop: '20px' }}
              type="password"
              placeholder="***********"
              label="Паролни кайта киритинг"
              labelsize={14}
              {...field}
            />
          )}
        />
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
            'Узгартириш'
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default NewPassword;
