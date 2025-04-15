import { useMutation } from 'react-query';
import request from '../request';

export const usePasswordReset = () =>
  useMutation('reset-password', (data: any) =>
    request.public
      .post('/account/password-reset/', data)
      .then((res) => res.data)
  );
export const usePasswordResetCheck = () =>
  useMutation('reset-password-check', (data: any) =>
    request.public
      .post('/account/password-reset-check/', data)
      .then((res) => res.data)
  );
export const useNewPassword = () =>
  useMutation('new-password', (data: any) =>
    request.public
      .post('/account/password-reset-confirm/', data)
      .then((res) => res.data)
  );
