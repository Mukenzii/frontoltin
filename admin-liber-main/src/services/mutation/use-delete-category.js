import { useMutation } from "react-query"
import { request } from ".."

const useDeleteCategory = () => {
    return useMutation(
        (data) =>
            request.delete(`api/v1/category/${data.categoryId}/delete/`, { visible: data.visible, thumbnail: data.thumbnail, title: data.title }))
}

export default useDeleteCategory