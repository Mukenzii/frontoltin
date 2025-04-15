import { useMutation } from "react-query";
import { request } from "..";

export const useBookCreate = () => {
    return useMutation((formData) =>
        request
            .post("api/v1/book/create/", formData)
            .then((res) => res.data)
    );
};