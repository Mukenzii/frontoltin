import { useQuery } from 'react-query';
import request from '../request';

export const useAudioBooks = () =>
  useQuery('audio-books', () =>
    request.public.get(`/book/audio-books/`).then((res) => res.data)
  );
