import { useMutation } from "react-query";
import { superRequest } from "..";

export const useDelRecommendation = () => {
    return useMutation((data) =>
        superRequest
            .delete(`api/v1/book/recommendation/${data.category}/delete/`,)
            .then((res) => res.data)
    );
};