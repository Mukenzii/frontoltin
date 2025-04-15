import { Row } from "reactstrap";
import Card from "./card";

const BookCard = (props) => {
    const book = props?.book;
    const recommendation = props?.recommendation
    // console.log(book?.results?.map((bookItem, index) => recommendation[index]?.book?.guid === bookItem?.guid))
    return (
        <>
            {book?.length === 0 ? <div className="text-warning">Категорияга оид китоблар топилмади!</div> :
                <Row className="flex-nowrap gap-3 overflow-auto">
                    {book?.map((bookItem) =>
                        <Card key={bookItem?.guid} refetch={props?.refetch} recommendation={recommendation} book={bookItem} isChecked={recommendation?.map(rec => rec?.book?.guid).includes(bookItem?.guid)} />)}
                </Row>
            }
        </>
    )

}

export default BookCard;