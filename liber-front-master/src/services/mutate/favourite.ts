import { useMutation } from 'react-query';
import request from '../request';

export const useFavourite = () =>
  useMutation('favourite', (data: { book: string }) =>
    request.private
      .post('/book/favourite/create/', data)
      .then((res) => res.data)
  );

export const useDeleteFavourite = () =>
  useMutation('delete-favourite', (data: { guid: string }) =>
    request.private.delete(`/book/favourite/${data?.guid}/delete/`)
  );
