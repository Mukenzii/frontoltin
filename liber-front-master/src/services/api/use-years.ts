import { useQuery } from 'react-query';
import request from '../request';

export const useYears = () =>
  useQuery('years-list', () =>
    request.public.get(`/book/published-list/`).then((res) => res.data)
  );
