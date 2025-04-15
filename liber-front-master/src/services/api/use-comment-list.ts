import { useInfiniteQuery } from 'react-query';
import request from '../request';

export const useCommentList = (guid?: string | string[]) =>
  useInfiniteQuery(
    'comment-list',
    ({ pageParam = 1 }) =>
      request.public
        .get(
          `/book/review/${guid}/list/?offset=${
            pageParam === 1 ? '' : pageParam * 4 - 4
          }`
        )
        .then((res) => res.data),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    }
  );
