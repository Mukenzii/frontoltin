/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import useBookContent from "../../services/mutation/use-book-content";
import { useDeleteBookFiles } from "../../services/mutation/use-book-delete";
import { useContentList } from "../../services/queries/use-content-list";
import BookmarkIcon from "../Icons/BookMarkIcon";
import HeadPhoneIcon from "../Icons/HeadPhoneIcon";
import { useLocation } from "../UserDetail/UserCridentionals";
import "./book.toast.style.scss";

const BookCridentials = () => {
  const createContent = useBookContent();
  const deleteBookFilesMutate = useDeleteBookFiles().mutate;
  const bookId = useLocation();
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bookTypes = [
    { value: "online", id: "001", name: "Электрон" },
    { value: "audio", id: "002", name: "Аудио" },
  ];
  const [category, setCategory] = useState(bookTypes[0].value);
  const toggle = () => setModal(!modal);
  const fileRef = useRef(null);
  const typeRef = useRef(null);
  const contentList = useContentList(bookId, page);
  useEffect(() => contentList.refetch(), []);
  useEffect(() => category, [category, setCategory]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target?.title.value);
    formData.append("book_type", e.target?.bookType.value);
    formData.append(
      "body",
      fileRef.current?.files[0],
      fileRef.current?.files[0].name
    );
    formData.append("book", `${bookId}`);
    createContent.mutate(formData, {
      onSuccess: () => {
        toggle();
        toast();
        setCategory(bookTypes[0].value);
        contentList.refetch();
      },
    });
  };
  const toast = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2000);
  };
  const handleDeleteBookFiles = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Учиришга аминмисиз?");
    if (result) {
      deleteBookFilesMutate(
        { id },
        {
          onSuccess: () => {
            contentList.refetch();
          },
        }
      );
    }
  };
  return (
    <div>
      <Button color="success mb-3 mx-3" onClick={toggle}>
        Таркиб қўшиш
      </Button>
      <div
        className={`${
          isVisible
            ? "d-flex p-3 rounded bg-success text-light w-25 text-center"
            : "d-none"
        }`}
      >
        Муваффақиятли якунланди!
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        modalTransition={{ timeout: 1000 }}
      >
        <ModalHeader title="Таркиб қўшиш" className="text-center">
          Таркиб қўшиш
        </ModalHeader>
        <ModalBody>
          <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label className="mt-2" htmlFor="title">
                Сарлавҳа
              </label>
              <input
                type="text"
                name="title"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label className="mt-2" htmlFor="select">
                Категория
              </label>
              <select
                required
                onChange={(e) => setCategory(e.target.value)}
                name="bookType"
                defaultValue={bookTypes[0].value}
                ref={typeRef}
                className="form-control"
                id="select"
                placeholder="Категорияни танланг"
              >
                {bookTypes.map((item) => (
                  <option key={item?.id} value={`${item?.value}`}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label className="mt-2" htmlFor="thumbnail">
                Файл (Қўллаб-қувватланадиган файл тури:
                {category === "online" ? " .epub" : " mp3"})
              </label>
              <input
                ref={fileRef}
                type="file"
                accept={`${
                  category === "online" ? "application/epub+zip" : "audio/mp3"
                }`}
                required
                className="form-control"
                id="thumbnail"
              />

              <Button
                disabled={createContent.isLoading}
                className="mt-3"
                color="dark"
              >
                {createContent.isLoading ? "Юкланмоқда..." : "Юбориш"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {contentList.isLoading ? (
        "Loading..."
      ) : (
        <div>
          <Table id="tech-companies-1 align-middle" striped bordered responsive>
            <thead>
              <tr>
                <th data-priority="3">Тартиби</th>
                <th data-priority="3">Китоб тури</th>
                <th data-priority="3">Китоб номи</th>
                <th data-priority="3">Амаллар</th>
              </tr>
            </thead>
            <tbody>
              {contentList?.data?.results?.length ? (
                contentList?.data?.results.map((item, index) => {
                  return (
                    <tr key={item?.guid}>
                      <td className="align-middle">{item?.guid}</td>
                      <td className="align-middle">
                        {item?.book_type === "audio" ? (
                          <HeadPhoneIcon />
                        ) : (
                          <BookmarkIcon />
                        )}
                      </td>
                      <td className="align-middle">{item?.title}</td>
                      <td className="align-middle">
                        <Button
                          color="danger"
                          className="mx-3"
                          onClick={() => handleDeleteBookFiles(item?.guid)}
                        >
                          Учириш
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} className="align-middle">
                    Китоблар мавжуд эмас!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
      <p>
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          color="warning"
        >
          Олдинги саҳифа
        </Button>{" "}
        <Button
          color="success"
          onClick={() => {
            if (!contentList.isPreviousData && contentList.data.next) {
              setPage((old) => old + 1);
            }
          }}
          disabled={contentList.isPreviousData || !contentList.data?.next}
        >
          Кейинги саҳифа
        </Button>
      </p>
    </div>
  );
};

export default BookCridentials;
