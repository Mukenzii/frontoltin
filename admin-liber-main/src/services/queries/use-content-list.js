import { useQuery } from "react-query";
import { request } from "..";

export const useContentList = (bookId, page) => {
    return useQuery(['book-content', bookId], () =>
        request
            .get(`api/v1/book/content/list/?book__guid=${bookId}&page=${page}`)
            .then((res) => res.data), { enabled: false }
    );
};