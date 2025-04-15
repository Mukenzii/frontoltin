import { useQuery } from 'react-query';
import request from '../request';

export const useMinMaxPrice = () =>
  useQuery('min-max-price', () =>
    request.public.get(`/book/book-price/`).then((res) => res.data)
  );
