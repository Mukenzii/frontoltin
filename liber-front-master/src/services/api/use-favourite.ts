import { useQuery } from 'react-query';
import request from '../request';

export const useFavouriteList = () =>
  useQuery('favourite-list', () =>
    request.private.get(`/book/favourite/list/`).then((res) => res.data)
  );
