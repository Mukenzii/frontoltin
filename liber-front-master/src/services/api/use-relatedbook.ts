import { useQuery } from 'react-query';
import request from '../request';

export const useRelatedBook = (guid: string) =>
  useQuery(['related-product', guid], () =>
    request.public.get(`/book/${guid}/related-books/`).then((res) => res.data)
  );
