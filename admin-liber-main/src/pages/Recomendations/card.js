import { useState } from "react";
import { Col } from "reactstrap";
import { useDelRecommendation } from "../../services/mutation/use-delete-rec-book";
import { useCreateRecommendation } from "../../services/mutation/use-recomend-book";

const Card = (props) => {
    const book = props?.book;
    const recommendation = props?.recommendation;
    const deleteRec = useDelRecommendation();
    const createRec = useCreateRecommendation()
    const isChecked = props?.isChecked
    const [isSwitched, setIsSwitched] = useState(isChecked)
    const loop = (bookId) => {
        let categoryId = ''
        for (let index = 0; index < recommendation?.length; index++) {
            recommendation[index]?.book?.guid === bookId ? categoryId = recommendation[index]?.guid : console.log()
        }
        return categoryId
    }

    const handleSubmit = (bookId) => {
        isSwitched ? deleteRec.mutate({ category: loop(bookId) }, { onSuccess: () => props?.refetch() })
            : createRec.mutate({ book: bookId }, { onSuccess: () => props?.refetch() })
    }

    return (
        <Col xs={2} style={{ background: '#212b38', overflowY: 'auto' }} className='p-3 rounded'>
            <div className="form-check form-switch">
                <input className="cursor-pointer form-check-input" defaultChecked={isChecked} disabled={deleteRec.isLoading || createRec.isLoading} onClick={() => handleSubmit(book?.guid)} value={isSwitched} onChange={() => setIsSwitched(!isSwitched)} type="checkbox" id={`checkbox${book?.guid}`} />
                <label className="form-check-label text-light" htmlFor={`checkbox${book?.guid}`}>Тавсия этиш</label>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column gap-1 mt-2">
                <div style={{ margin: '0 auto' }}><img height={'100px'} width={'138px'} style={{ objectFit: 'contain', margin: "0 auto" }} src={book?.thumbnail} alt={book?.title} /></div>
                <div style={{ color: '#d5d5de' }} className="fw-bolder">{book?.author}</div>
                <div style={{ color: '#80808a' }}>{book?.title}</div>
            </div>
        </Col>

    )

}

export default Card;