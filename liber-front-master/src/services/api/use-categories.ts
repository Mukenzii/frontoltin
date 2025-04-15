import { useQuery } from 'react-query';
import request from '../request';

export const useCategories = () =>
  useQuery('categories', () =>
    request.public.get(`/category/list/`).then((res) => res.data)
  );
