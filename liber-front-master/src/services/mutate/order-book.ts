import { useMutation } from 'react-query';
import request from '../request';

export const useBuyPaperBook = () =>
  useMutation(
    'buy-paper-book',
    (data: {
      book: string;
      book_type: string;
      payment_type: string;
      phone_number: string;
      full_name: string;
      quantity: number;
    }) =>
      request.private
        .post('/order/customer/create/', data)
        .then((res) => res.data)
  );

export const useBuyOnlineBook = () =>
  useMutation(
    'buy-online-book',
    (data: { book: string; book_type: string; payment_type: string }) =>
      request.private
        .post('/order/customer/create/', data)
        .then((res) => res.data)
  );
