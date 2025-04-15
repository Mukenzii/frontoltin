import { useMutation } from 'react-query';
import request from '../request';

export const useVerify = () =>
  useMutation('verify', (data: any) =>
    request.public.post('/account/verify-phone/', data).then((res) => res.data)
  );

export const useReSendOtp = () =>
  useMutation('resend-otp', (data: any) =>
    request.public.post('/account/resend-otp/', data).then((res) => res.data)
  );
