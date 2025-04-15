import { useMutation } from "react-query";
import { request } from "..";

export const useCategoryCreate = () => {
    return useMutation((formData) =>
        request
            .post("api/v1/category/create/", formData)
            .then((res) => res.data)
    );
};