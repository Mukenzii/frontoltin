import { useMutation } from "react-query";
import { request } from "..";

const useUpdateBook = (bookId) => useMutation((formData) => request.put(`api/v1/book/${bookId}/update/`, formData))
export default useUpdateBook;