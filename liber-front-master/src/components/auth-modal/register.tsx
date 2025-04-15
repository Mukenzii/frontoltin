import React from 'react';
import { Stack, Button, CircularProgress, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Controller } from 'react-hook-form';
import { Input } from 'components/input';
import { useRegister } from 'services/mutate/register';
import { AuthTypes } from './auth.types';

const Register = ({
  setIsSignUp,
  setStep,
  control,
  handleSubmit,
}: {
  setIsSignUp: any;
  setStep: any;
  control: any;
  handleSubmit: any;
}) => {
  const { mutate, isLoading } = useRegister();

  const handleRegister = (values: AuthTypes) => {
    const regValues = {
      username: values.reg_username,
      password: values.reg_password,
      first_name: values.first_name,
    };
    mutate(regValues, {
      onSuccess: () => {
        setStep(2);
      },
      onError: (res) => {
        toast.error(get(res, 'response.data.username[0]'));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
        Руйхатдан утиш
      </Typography>
      <Stack direction="column">
        <Controller
          control={control}
          name="first_name"
          render={({ field }) => (
            <Input
              sx={{ marginTop: '50px' }}
              placeholder="Ism va familyangizni kiriting"
              label="Ism va Familya"
              labelsize={14}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="reg_username"
          defaultValue=""
          render={({ field }) => (
            <Input
              sx={{ marginTop: '20px' }}
              placeholder="Email ёки телефон рақами"
              label="Email ёки телефон рақами"
              labelsize={14}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="reg_password"
          render={({ field }) => (
            <Input
              sx={{ marginTop: '20px' }}
              type="password"
              placeholder="*********"
              label="Паролни киритинг"
              labelsize={14}
              {...field}
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
            'Руйхатдан утиш'
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
          onClick={() => setIsSignUp(false)}
        >
          Кириш
        </Button>
      </Stack>
    </form>
  );
};

export default Register;
