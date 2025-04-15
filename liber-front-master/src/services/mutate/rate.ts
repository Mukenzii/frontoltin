import { useMutation } from 'react-query';
import request from '../request';

export const useRate = () =>
  useMutation('rate', (data: any) =>
    request.private.post('/book/rate/create/', data).then((res) => res.data)
  );
