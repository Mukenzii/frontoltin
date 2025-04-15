import { useQuery } from 'react-query';
import request from '../request';

export const useSubscriptionList = () =>
  useQuery('subscription-list', () =>
    request.private.get(`/subscription/list/`).then((res) => res.data)
  );
