import { useMutation } from 'react-query';
import request from '../request';

export const useSubscription = () =>
  useMutation(
    'subscription-create',
    (data: { category: string; category_type: string }) =>
      request.private
        .post('/subscription/create/', data)
        .then((res) => res.data)
  );
