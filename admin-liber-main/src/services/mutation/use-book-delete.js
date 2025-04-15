import { useMutation } from "react-query";
import { superRequest } from "..";

export const useDeleteBook = () => {
  return useMutation((data) =>
    superRequest
      .delete(`api/v1/book/${data.id}/delete/`)
      .then((res) => res.data)
  );
};

export const useDeleteBookFiles = () => {
  return useMutation((data) =>
    superRequest
      .delete(`api/v1/book/content/${data.id}/delete/`)
      .then((res) => res.data)
  );
};
