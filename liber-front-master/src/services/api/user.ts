import { useQuery } from 'react-query';
import { UserDetails } from 'types/user.types';
import request from '../request';

export const useUser = (guid: string, isChanged?: boolean) =>
  useQuery(['user', guid, isChanged], () =>
    request.public
      .get(`/account/${guid}/detail/`)
      .then((res: { data: UserDetails }) => res.data)
  );
