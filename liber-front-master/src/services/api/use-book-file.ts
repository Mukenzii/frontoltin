import { useQuery } from 'react-query';
import request from '../request';

export const useBookFile = (guid: string | string[]) =>
  useQuery(['book-file', guid], () =>
    request.private
      .get(`/book/content/${guid}/contents/`)
      .then((res) => res.data)
  );
