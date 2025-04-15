import { useQuery } from 'react-query';
import request from '../request';

export const useMyAudioBooks = () =>
  useQuery('my-audio-books', () =>
    request.private.get(`/account/audio_book/list/`).then((res) => res.data)
  );

export const useMyOnlineBooks = () =>
  useQuery('my-online-books', () =>
    request.private.get(`/account/online_book/list/`).then((res) => res.data)
  );
