import { useQuery } from "react-query";
import { request } from "..";

export const useSingleBookDetails = (bookId) => {
  return useQuery(
    ["book-content", bookId],
    () => request.get(`api/v1/book/${bookId}/detail/`).then((res) => res.data)
    // { enabled: false }
  );
};
