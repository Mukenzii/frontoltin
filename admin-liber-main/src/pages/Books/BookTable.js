/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useDeleteBook } from "../../services/mutation/use-book-delete";
import { get } from "lodash";

const BookTable = (props) => {
  const idRef = useRef(null);
  const { mutate } = useDeleteBook();
  const history = useHistory();
  const handleDeleteBook = (id) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Учиришга аминмисиз?");
    if (result) {
      mutate(
        { id },
        {
          onSuccess: () => {
            props.refetch();
          },
        }
      );
    }
  };
  return (
    <React.Fragment>
      <h5 className="mb-4 fw-bolder px-2 text-start">Китоблар</h5>
      <Link to="book/create">
        <Button color="success mb-3 mx-3">Китоб қўшиш</Button>
      </Link>
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
                        <th>Кичик расм</th>
                        <th data-priority="2">Сарлавҳа</th>
                        <th data-priority="3">Муаллиф</th>
                        <th data-priority="3">Рейтинг</th>
                        <th data-priority="2">Амаллар</th>
                      </tr>
                    </thead>
                    <tbody>
                      {get(props, "data.results", []).map((item, index) => {
                        return (
                          <tr key={item?.guid}>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              <img
                                width={"90px"}
                                alt={item?.thumbnail?.substring(0, 10)}
                                src={item?.thumbnail}
                              />
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle cursor-pointer text-body"
                            >
                              {item?.title}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              {item?.author}
                            </td>
                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                history.push(`/book/:${item?.guid}`, item?.guid)
                              }
                              className="align-middle text-body"
                            >
                              ★ {item?.rating}
                            </td>
                            <td style={{ display: "none" }}>
                              <input
                                type="text"
                                ref={idRef}
                                value={item?.guid}
                              />
                            </td>
                            <td className="align-middle">
                              <Link to={`book/update/${item?.guid}`}>
                                <Button color="warning">Таҳрирлаш</Button>
                              </Link>
                              <Button
                                color="danger"
                                className="mx-3"
                                onClick={() => handleDeleteBook(item?.guid)}
                              >
                                Учириш
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

export default BookTable;
