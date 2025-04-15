import { useQuery } from 'react-query';
import request from '../request';

export const useNewBooks = () =>
  useQuery('new-books', () =>
    request.public.get(`/book/new-books/`).then((res) => res.data)
  );
