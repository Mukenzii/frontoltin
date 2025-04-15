import { useMutation } from "react-query";
import { request } from "..";

export const useBookDetails = () =>
  useMutation((data) => request.get(`api/v1/book/${data.id}/detail/`));
