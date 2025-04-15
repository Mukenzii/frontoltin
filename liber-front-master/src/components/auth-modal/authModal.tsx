/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import * as yup from 'yup';
import Image from 'next/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import wavePng from '../../assets/png/waveElement2.png';
import { AuthModalTypes } from './auth.types';
import Register from './register';
import Login from './login';
import Verify from './verify';
import ResetPassword from './reset-password';

const AuthModal: React.FC<AuthModalTypes> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [step, setStep] = useState(1);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isForgotPasswordVerify, setIsForgotPasswordVerify] = useState(false);
  const validSchema = yup.object({});

  const { control, handleSubmit, watch } = useForm({
    resolver: yupResolver(validSchema),
    defaultValues: {
      username: '',
      password: '',
      reg_password: '',
      reg_username: '',
      firstName: '',
    },
  });

  return (
    <Modal
      open={isModalOpen || false}
      sx={{ border: 'none' }}
      onClose={(_, reason) => {
        if (reason === 'backdropClick') {
          setIsModalOpen(false);
        }
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          width: 750,
          minHeight: 350,
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', right: 0, bottom: 0 }}>
          <Image src={wavePng} alt="wave" />
        </Box>
        <Box
          sx={{
            padding: '60px 200px',
            display: 'flex',
            flexDirection: 'column',
            // alignItems: "center",
            justifyContent: 'center',
            boxSizing: 'borderBox',
          }}
        >
          {step === 1 ? (
            !isSignUp ? (
              !isForgotPassword ? (
                <Login
                  {...{
                    setIsSignUp,
                    control,
                    handleSubmit,
                    setIsForgotPassword,
                  }}
                />
              ) : !isForgotPasswordVerify ? (
                <ResetPassword
                  {...{ control, handleSubmit, setIsForgotPasswordVerify }}
                />
              ) : (
                <Verify
                  {...{
                    handleSubmit,
                    setStep,
                    watch,
                    isForgotPasswordVerify,
                    control,
                  }}
                />
              )
            ) : (
              <Register {...{ setIsSignUp, setStep, control, handleSubmit }} />
            )
          ) : (
            <Verify
              {...{
                handleSubmit,
                setStep,
                watch,
                isForgotPasswordVerify,
                control,
              }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
