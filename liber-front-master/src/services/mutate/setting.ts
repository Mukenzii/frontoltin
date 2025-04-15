import { useMutation } from 'react-query';
import request from '../request';

export const useSetting = (guid: string) =>
  useMutation('setting', (data: any) =>
    request.private
      .put(`/account/${guid}/update/`, data)
      .then((res) => res.data)
  );
