import { useInfiniteQuery } from "react-query";
import { request } from "..";

// export const useBookList = (categoryId) => useInfiniteQuery(['book-list'], ({ pageParam = 1 }) => request.get(`api/v1/book/list/?page=${pageParam}`, { getNextPageParam: (lastPage, pages) => lastPage.next ? console.log(lastPage, 'last page') : console.log(pages, 'pages') }).then((res) => res.data)
// );

// api/v1/book/list/?category__guid=${categoryId}&page=${pageParam}


const useBookList = (categoryId) => useInfiniteQuery(['book', 'category', categoryId],
    ({ pageParam = 1 }) => request.get(`api/v1/book/list/?category__guid=${categoryId}&page=${pageParam}`)
        .then(res => res.data), { getNextPageParam: (lastPage, pages) => lastPage?.next ? pages?.length + 1 : null }
)

export default useBookList   