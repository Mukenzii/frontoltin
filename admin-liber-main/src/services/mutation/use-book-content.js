import { useMutation } from "react-query";
import { request } from "..";


const useBookContent = () => useMutation((formData) => request.post('api/v1/book/content/create/', formData))

export default useBookContent