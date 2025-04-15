import React, { useRef, useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useCategoryCreate } from "../../services/mutation/use-create-category";
import useDeleteCategory from "../../services/mutation/use-delete-category";
import { useCategoryUpdate } from "../../services/mutation/use-update-category";

const CategoryTable = (props) => {
  const fileRef = useRef();
  const [catgryGuid, setCatgryGuid] = useState(-1);
  const [catgryId, setCatgryId] = useState(-1);
  const createCategory = useCategoryCreate();
  const updateCategory = useCategoryUpdate(catgryId);
  const deleteCategory = useDeleteCategory();
  const [modal, setModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [types, setTypes] = useState([1]);

  const handleDelete = (category) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Ўчиришга аминмисиз?");
    if (result) {
      deleteCategory.mutate(
        {
          categoryId: category.guid,
          visible: true,
          thumbnail: category?.thumbnail,
          title: category?.title,
        },
        {
          onSuccess: () => props.refetch(),
          onError: () => {
            alert("Нимадир хато!");
          },
        }
      );
    }
  };
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);
  const handleClose = () => setModal(false);
  const handleEditClose = () => setEditModal(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const categoryForm = new FormData();
    categoryForm.append("title", `${e.target.title_ru?.value}`);
    categoryForm.append("title_ru", `${e.target.title_ru?.value}`);
    categoryForm.append("title_uz", `${e.target.title_uz?.value}`);
    fileRef.current.files[0] &&
      categoryForm.append(
        "thumbnail",
        fileRef.current.files[0],
        `${fileRef.current.files[0].name}`
      );
    for (let item in types) {
      categoryForm.append(
        `category_types[${Number(item)}]days`,
        `${e.target[Number(item) * 2 + 3]?.value}`
      );
      categoryForm.append(
        `category_types[${Number(item)}]price`,
        `${e.target[Number(item) * 2 + 4]?.value}`
      );
    }
    updateCategory.mutate(categoryForm, {
      onSuccess: () => {
        handleEditClose();
        props.refetch();
      },
      onError: (e) => console.log(e),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryForm = new FormData();
    categoryForm.append("title_ru", `${e.target.title_ru?.value}`);
    categoryForm.append("title", `${e.target.title_ru?.value}`);
    categoryForm.append("title_uz", `${e.target.title_uz?.value}`);
    categoryForm.append(
      "thumbnail",
      fileRef.current.files[0],
      `${fileRef.current.files[0].name}`
    );
    for (let item in types) {
      categoryForm.append(
        `category_types[${Number(item)}]days`,
        `${e.target[Number(item) * 2 + 3]?.value}`
      );
      categoryForm.append(
        `category_types[${Number(item)}]price`,
        `${e.target[Number(item) * 2 + 4]?.value}`
      );
    }
    createCategory.mutate(categoryForm, {
      onSuccess: () => {
        console.log("Success");
        handleClose();
        props.refetch();
      },
      onError: () => console.log("error"),
    });
  };

  return (
    <React.Fragment>
      <h5 className="mb-4 fw-bolder px-2 text-start">Категория</h5>
      <Button color="success mb-3 mx-3" onClick={toggle}>
        Категория қўшиш
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        modalTransition={{ timeout: 1000 }}
      >
        <ModalHeader title="Категория қўшиш" className="text-center">
          Категория қўшиш
        </ModalHeader>
        <ModalBody>
          <form className="form-control" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="title">Сарлавҳа(RU)</label>
              <input
                type="text"
                name="title_ru"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label htmlFor="title" className="mt-2">
                Сарлавҳа(UZ)
              </label>
              <input
                type="text"
                name="title_uz"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              {/* <label htmlFor="price" className="mt-2">
                Нархи
              </label>
              <input
                type="number"
                name="price"
                required
                className="form-control"
                id="price"
                placeholder="Нархи"
              /> */}

              <label htmlFor="file" className="mt-3">
                Кичик расм
              </label>
              <input
                type="file"
                required
                accept="image/*"
                className="form-control"
                id="file"
                ref={fileRef}
              />
              {types.map((item, index) => (
                <div key={index}>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor={`day${item}`} className="mt-3">
                        Сана {item}
                      </label>
                      <input
                        type="number"
                        min={1}
                        name={`date${item}`}
                        required
                        className="form-control"
                        id={`day${item}`}
                        placeholder="Сана"
                      />
                    </div>
                    <div>
                      <label htmlFor={`price${item}`} className="mt-3">
                        Нархи {item}
                      </label>
                      <input
                        type="number"
                        min={1}
                        name={`price${item}`}
                        required
                        className="form-control"
                        id={`price${item}`}
                        placeholder="Нархи"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex gap-2 mt-3">
                <Button
                  color="success"
                  onClick={() => setTypes([...types, types.length + 1])}
                >
                  +
                </Button>
                <Button
                  color="warning"
                  disabled={types.length === 1}
                  onClick={() => setTypes([1])}
                >
                  Тозалаш
                </Button>
              </div>

              <Button className="mt-3" color="dark">
                Submit
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={editModal}
        toggle={editToggle}
        centered
        modalTransition={{ timeout: 1000 }}
      >
        <ModalHeader title="Edit category" className="text-center">
          Edit category
        </ModalHeader>
        <ModalBody>
          <form className="form-control" onSubmit={(e) => handleEditSubmit(e)}>
            <div className="form-group">
              <label htmlFor="title">Сарлавҳа (RU)</label>
              <input
                type="text"
                // defaultValue={props?.data.results[catgryGuid]?.title_ru}
                name="title_ru"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label htmlFor="title" className="mt-2">
                Сарлавҳа (UZ)
              </label>
              <input
                type="text"
                // defaultValue={props?.data?.results[catgryGuid]?.title_uz}
                name="title_uz"
                required
                className="form-control"
                id="title"
                placeholder="Сарлавҳа"
              />
              <label htmlFor="file" className="mt-3">
                Кичик расм
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="file"
                ref={fileRef}
              />
              {types.map((item, index) => (
                <div key={index}>
                  <div className="d-flex gap-2">
                    <div>
                      <label htmlFor={`day${index + 1}`} className="mt-3">
                        Сана {index + 1}
                      </label>
                      <input
                        type="number"
                        defaultValue={types[index]?.days}
                        min={1}
                        name={`date${item}`}
                        required
                        className="form-control"
                        id={`day${item}`}
                        placeholder="Сана"
                      />
                    </div>
                    <div>
                      <label htmlFor={`price${index + 1}`} className="mt-3">
                        Нархи {index + 1}
                      </label>
                      <input
                        type="number"
                        defaultValue={types[index]?.price}
                        min={1}
                        name={`price${index + 1}`}
                        required
                        className="form-control"
                        id={`price${item}`}
                        placeholder="Нархи"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex gap-2 mt-3">
                <Button
                  color="success"
                  onClick={() => setTypes([...types, types.length + 1])}
                >
                  +
                </Button>
                <Button
                  color="warning"
                  disabled={types.length === 1}
                  onClick={() => setTypes([1])}
                >
                  Тозалаш
                </Button>
              </div>
              <Button className="mt-3" color="dark">
                Юбориш
              </Button>
              <Button
                className="mt-3 mx-3"
                onClick={() => handleEditClose()}
                color="dark"
              >
                Ёпиш
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <Row className="p-0 m-0">
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="table-rep-plugin text-center">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <Table
                    id="tech-companies-1 align-middle"
                    striped
                    bordered
                    responsive
                  >
                    <thead>
                      <tr>
                        <th>Профиль фотосурати</th>
                        <th data-priority="1">Сарлавҳа(RU)</th>
                        <th data-priority="1">Сарлавҳа(UZ)</th>
                        <th data-priority="3">Турлари</th>
                        <th data-priority="3">Амаллар</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data?.results?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="align-middle">
                              <img
                                width={"90px"}
                                alt={item.thumbnail.substring(0, 10)}
                                src={item.thumbnail}
                              />
                            </td>
                            <td className="align-middle">{item.title_ru}</td>
                            <td className="align-middle">{item.title_uz}</td>
                            <td className="align-middle">
                              <div className="d-flex flex-column">
                                {item.category_types.map((state, ind) => (
                                  <div key={state.guid}>
                                    <div className="mt-2">
                                      <span className="p-1 rounded mt-4 bg-success text-light">
                                        Куни: {state.days}
                                      </span>
                                      <span className="p-1 rounded  bg-success text-light">
                                        Нархи: {state.price}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="align-middle">
                              <Button
                                onClick={() => {
                                  setCatgryId(item.guid);
                                  setCatgryGuid(index);
                                  editToggle();
                                  setTypes([...item.category_types]);
                                }}
                                color="warning"
                              >
                                Таҳрирлаш
                              </Button>
                              <Button
                                onClick={() => handleDelete(item)}
                                className="mx-3"
                                color="danger"
                              >
                                Ўчириш
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CategoryTable;
