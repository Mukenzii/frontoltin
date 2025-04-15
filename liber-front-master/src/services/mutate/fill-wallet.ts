import { useMutation } from 'react-query';
import request from '../request';

export const useFillWallet = () =>
  useMutation(
    'fill-wallet',
    (data: { transaction_type: string; price: number }) =>
      request.private
        .post('/transaction/initialize_payment/', data)
        .then((res) => res.data)
  );
