import React from 'react';
// eslint-disable-next-line import/named
import { usePasswordReset } from 'services/mutate/reset-password';
import { Stack, Button, CircularProgress, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Input } from 'components/input';

const ResetPassword = ({
  control,
  handleSubmit,
  setIsForgotPasswordVerify,
}: {
  control: any;
  handleSubmit: any;
  setIsForgotPasswordVerify: any;
}) => {
  const { mutate, isLoading } = usePasswordReset();
  const handleChange = (values: { username: string }) => {
    mutate(values, {
      onSuccess: () => {
        setIsForgotPasswordVerify(true);
      },
    });
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
        Паролни тиклаш
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
            'Жунатиш'
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default ResetPassword;
