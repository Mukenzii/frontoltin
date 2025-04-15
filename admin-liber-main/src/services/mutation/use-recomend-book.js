import { useMutation } from "react-query";
import { superRequest } from "..";

export const useCreateRecommendation = () => {
    return useMutation((data) =>
        superRequest
            .post("api/v1/book/recommendation/create/", data)
            .then((res) => res.data)
    );
};