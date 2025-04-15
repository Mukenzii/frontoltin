import { useMutation } from 'react-query';
import request from '../request';

export const useRegister = () =>
  useMutation('signup', (data: any) =>
    request.public.post('/account/register/', data).then((res) => res.data)
  );
