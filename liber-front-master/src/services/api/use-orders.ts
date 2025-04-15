import { useQuery } from 'react-query';
import request from '../request';

export const useOrdersList = () =>
  useQuery('orders-list', () =>
    request.private.get(`/order/customer/list/`).then((res) => res.data)
  );
