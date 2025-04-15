import { useQuery } from 'react-query';
import request from '../request';

export const useSingleProduct = (guid: string) =>
  useQuery(['single-product', guid], () =>
    request.public
      .get(`/book/${guid}/detail/`)
      .then((res: { data: any }) => JSON.parse(JSON.stringify(res.data)))
  );
