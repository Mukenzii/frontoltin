import { useMutation } from 'react-query';
import request from '../request';

export const useLogin = () =>
  useMutation('login', (data: any) =>
    request.public.post('/account/user-login/', data).then((res) => res.data)
  );
