import { useMutation } from 'react-query';
import request from '../request';

export const useComment = () =>
  useMutation('comment', (data: any) =>
    request.private.post('/book/review/create/', data).then((res) => res.data)
  );
