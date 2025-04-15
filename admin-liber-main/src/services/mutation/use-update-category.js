import { useMutation } from "react-query";
import { request } from "..";

export const useCategoryUpdate = (id) => {
    return useMutation((formData) =>
        request
            .put(`api/v1/category/${id}/update/`, formData)
            .then((res) => res.data)
    );
};