/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useListRecommendation } from "../../services/queries/use-recommended-books";
import BookCard from "./book-card";
import useBookList from "../../services/queries/use-book-list"
import { Button } from "reactstrap";

const RecomendationList = (props) => {
    const bookList = useBookList(props?.category?.guid);
    const { data, refetch } = useListRecommendation()
    const bookListResult = bookList?.data?.pages?.reduce(
        (acc, page) => acc.concat(page?.results),
        []
    );
    useEffect(() => props?.category?.guid, [props?.category])
    return (
        <div className="mb-5">

            <h5>{props?.category?.title}</h5>
            <BookCard refetch={refetch} book={bookListResult} recommendation={data?.results} />
            {bookList?.hasNextPage && <Button className="mt-3" disabled={!bookList.hasNextPage} color="success" onClick={() => bookList.fetchNextPage()}>{bookList.isLoading ? 'Юкланмоқда...' : 'Кўпроқ юклаш'}</Button>}
        </div>
    )
}

export default RecomendationList