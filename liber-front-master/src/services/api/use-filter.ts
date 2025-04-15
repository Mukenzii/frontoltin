import { useQuery } from 'react-query';
import request from '../request';

export const getFilter = (
  min_price?: number,
  max_price?: number,
  category?: string | string[],
  book_type?: string | string[],
  published_date?: number | string,
  currentPage?: number,
  sort?: string,
  search?: string
) =>
  useQuery(
    [
      'use-filter',
      {
        // min_price,
        // max_price,
        category,
        book_type,
        published_date,
        currentPage,
        sort,
        search,
      },
    ],
    () =>
      request.public
        .get(
          `/book/book-filter/?${
            sort || 'new-book'
          }&category=${category}&book_type=${book_type}&published_date=${published_date}&search=${search}&page=${currentPage}`
        )
        .then((res) => res.data)
  );
