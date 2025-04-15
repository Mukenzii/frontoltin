import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import useUpdateBook from "../../services/mutation/use-book-update";
import { useSingleBookDetails } from "../../services/queries/use-book-details";
import { useCategoryList } from "../../services/queries/use-category-list";

const BookUpdate = () => {
  const history = useHistory();
  const { id } = useParams();
  const [file, setFile] = useState();
  const categoryList = useCategoryList();
  const bookDetail = useSingleBookDetails(id);
  const detail = bookDetail?.data;
  const bookUpdate = useUpdateBook(id);
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const bookForm = new FormData();
    bookForm.append("title", `${e.target.title?.value}`);
    bookForm.append("author", `${e.target.author?.value}`);
    file && bookForm.append("thumbnail", file, file?.name);
    bookForm.append("category", `${e.target.select?.value}`);
    bookForm.append("language", `${e.target.language?.value}`);
    bookForm.append("hardcover", `${e.target.hardcover?.value}`);
    bookForm.append("publisher", `${e.target.publisher?.value}`);
    bookForm.append("isbn", `${e.target.isbn?.value}`);
    bookForm.append(
      "short_description_ru",
      `${e.target.short_description_ru?.value}`
    );
    bookForm.append(
      "short_description_uz",
      `${e.target.short_description_uz?.value}`
    );
    bookForm.append("published_date", `${e.target.published_date?.value}`);
    bookForm.append("types[0]book_type", "online");
    bookForm.append("types[0]price", `${e.target.bookprice_1?.value}`);
    bookForm.append("types[1]book_type", "paper");
    bookForm.append("types[1]price", `${e.target.bookprice_2?.value}`);
    bookForm.append("types[2]book_type", "audio");
    bookForm.append("types[2]price", `${e.target.bookprice_3?.value}`);
    bookForm.append("guid", `${id}`);
    bookUpdate.mutate(bookForm, {
      onSuccess: () => {
        history.push("/books");
      },
    });
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h3>Китобни тахрирлаш</h3>
          <form onSubmit={(e) => handleEditSubmit(e)}>
            <div className="form-group">
              <Row xs="2">
                <Col>
                  <label className="mt-2" htmlFor="title">
                    Сарлавҳа
                  </label>
                  <input
                    defaultValue={detail?.title}
                    type="text"
                    name="title"
                    required
                    className="form-control"
                    id="title"
                    placeholder="Сарлавҳа"
                  />
                  <label className="mt-2" htmlFor="author">
                    Муаллиф
                  </label>
                  <input
                    defaultValue={detail?.author}
                    type="text"
                    name="author"
                    required
                    className="form-control"
                    id="author"
                    placeholder="Муаллиф"
                  />
                  <label className="mt-2" htmlFor="select">
                    Категория
                  </label>
                  {console.log(detail?.category?.guid)}
                  <select
                    defaultValue={detail?.category?.guid}
                    required
                    name="category_guid"
                    className="form-control"
                    id="select"
                    placeholder="Категорияни танланг"
                  >
                    <option value={detail?.category?.guid}>
                      {detail?.category?.title}
                    </option>
                    {categoryList?.results?.map((item, index) => (
                      <option key={item?.guid} value={`${item?.guid}`}>
                        {item?.title}
                      </option>
                    ))}
                  </select>
                  <label className="mt-2" htmlFor="language">
                    Тил
                  </label>
                  <input
                    defaultValue={detail?.language}
                    type="text"
                    name="language"
                    required
                    className="form-control"
                    id="language"
                    placeholder="Тил"
                  />
                  <label className="mt-2" htmlFor="hardcover">
                    Сахифалар сони
                  </label>
                  <input
                    defaultValue={detail?.hardcover}
                    type="number"
                    min={1}
                    name="hardcover"
                    required
                    className="form-control"
                    id="hardcover"
                    placeholder="Сон киритинг"
                  />
                  <label htmlFor="publisher" className="mt-2">
                    Нашриёт
                  </label>
                  <input
                    defaultValue={detail?.publisher}
                    className="form-control"
                    id="publisher"
                    name="publisher"
                    placeholder="Хилол нашр"
                  />
                  <label className="mt-2" htmlFor="published_date">
                    Нашр қилинган сана
                  </label>
                  <input
                    defaultValue={detail?.published_date}
                    type="number"
                    min="1800"
                    max="2050"
                    step="1"
                    name="published_date"
                    required
                    className="form-control"
                    id="published_date"
                  />
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_1" className="mt-3">
                        Электрон
                      </label>
                      <input
                        type="number"
                        value="Электрон"
                        readOnly
                        name="booktype_1"
                        required
                        className="form-control"
                        id={`booktype_1`}
                        placeholder="Электрон"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_1`} className="mt-3">
                        Нархи
                      </label>
                      <input
                        defaultValue={detail?.types[0]?.price}
                        type="text"
                        required
                        className="form-control"
                        id={`bookprice_1`}
                        name="bookprice_1"
                        placeholder="Нархи"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_2" className="mt-3">
                        Қоғоз
                      </label>
                      <input
                        type="text"
                        value="Қоғоз"
                        readOnly
                        name="booktype_2"
                        required
                        className="form-control"
                        id={`booktype_2`}
                        placeholder="Қоғоз"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_2`} className="mt-3">
                        Нархи
                      </label>
                      <input
                        defaultValue={detail?.types[1]?.price}
                        type="number"
                        required
                        className="form-control"
                        id={`bookprice_2`}
                        name="bookprice_2"
                        placeholder="Нархи"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor="booktype_3" className="mt-3">
                        Аудио
                      </label>
                      <input
                        type="text"
                        value="Аудио"
                        readOnly
                        name="booktype_3"
                        required
                        className="form-control"
                        id={`booktype_3`}
                        placeholder="Аудио"
                      />
                    </div>
                    <div>
                      <label htmlFor={`bookprice_3`} className="mt-3">
                        Нархи
                      </label>
                      <input
                        defaultValue={detail?.types[2]?.price}
                        type="number"
                        required
                        className="form-control"
                        id={`bookprice_3`}
                        name="bookprice_3"
                        placeholder="Нархи"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <label htmlFor="isbn" className="mt-3">
                      ISBN
                    </label>
                    <input
                      defaultValue={detail?.isbn}
                      className="form-control"
                      id="isbn"
                      name="isbn"
                      placeholder="9789943646223"
                    />
                  </div>
                  <label className="mt-2" htmlFor="short_description">
                    Қисқа тавсифи (RU)
                  </label>
                  <textarea
                    defaultValue={detail?.short_description_ru}
                    type="text"
                    name="short_description"
                    required
                    rows="4"
                    className="form-control"
                    id="short_description_ru"
                    placeholder="Қисқа тавсифи"
                  />
                  <label className="mt-2" htmlFor="short_description">
                    Қисқа тавсифи (UZ)
                  </label>
                  <textarea
                    defaultValue={detail?.short_description_uz}
                    type="text"
                    name="short_description"
                    required
                    rows="4"
                    className="form-control"
                    id="short_description_uz"
                    placeholder="Қисқа тавсифи"
                  />
                  <label className="mt-2" htmlFor="thumbnail">
                    Расм юклаш
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="thumbnail"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <img
                    src={file ? URL.createObjectURL(file) : detail?.thumbnail}
                    className="mt-3"
                    width="250px"
                    height="300px"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    alt=""
                  />
                  <br />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button className="mx-0 m-4" type="submit" color="success">
                      {bookUpdate?.isLoading ? "Юкланмоқда..." : "Тахрирлаш"}
                    </Button>
                    <Button
                      className="m-4"
                      type="button"
                      color="dark"
                      onClick={() => history.push("/books")}
                    >
                      Бекор қилиш
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BookUpdate;
