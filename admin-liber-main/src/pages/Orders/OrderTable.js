/* eslint-disable array-callback-return */
import React from "react";
import Cookies from "js-cookie";
import Default from "../../assets/images/default.png";
import { Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import { API_URL } from "../../configs/app.config";

const OrderTable = (props) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${Cookies.get("user_token")}`
  );
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    is_paid: true,
    is_complete: true,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
  };

  const handleChange = (guId) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Аминмисиз?");
    if (result) {
      fetch(`${API_URL}api/v1/order/customer/${guId}/complete/`, requestOptions)
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
    }
  };
  const handleChangeCancelled = (guId) => {
    // eslint-disable-next-line no-restricted-globals
    var result = confirm("Буюртмани бекор қилмоқчимисиз?");
    if (result) {
      fetch(`${API_URL}api/v1/order/customer/${guId}/complete/`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          is_paid: true,
          is_complete: false,
        }),
      })
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <React.Fragment>
      <Row className="p-0 m-0">
        <Col xs={12}>
          <h5 className="mb-4 fw-bolder px-2 text-start">Буюртмалар</h5>
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
                        <th data-priority="1">Сарлавҳа</th>
                        <th data-priority="3">Умумий нарх</th>
                        <th data-priority="3">Миқдори</th>
                        <th data-priority="3">Тўлов тури</th>
                        <th data-priority="3">Тўлиқ исми</th>
                        <th data-priority="3">Тел.рақами</th>
                        {/* <th data-priority="3">Холати</th> */}
                        <th data-priority="3">Амаллар</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.data.results?.map((item, index) => {
                        if (!localStorage.getItem(item.guid)) {
                          return (
                            <tr key={item.guid}>
                              <td className="align-middle">
                                <img
                                  width={"60px"}
                                  alt={item?.book_title?.substring(0, 10)}
                                  src={item?.book_image || Default}
                                />
                              </td>
                              <td className="align-middle">
                                {item?.book_title}
                              </td>
                              <td className="align-middle">
                                {Number(item?.total_price).toLocaleString()}
                              </td>
                              <td className="align-middle">{item?.quantity}</td>

                              <td className="align-middle">
                                {item?.payment_type}
                              </td>
                              <td className="align-middle">
                                {item?.full_name}
                              </td>
                              <td className="align-middle">
                                {item?.phone_number}
                              </td>
                              {/* <td className="align-middle">
                                <Alert color="primary">pending</Alert>
                              </td> */}
                              <td className="align-middle">
                                <Button
                                  color="success"
                                  onClick={() => {
                                    handleChange(item.guid);
                                    window.localStorage.setItem(
                                      item.guid,
                                      item.guid
                                    );
                                    props.refetch();
                                  }}
                                >
                                  Тугатилди
                                </Button>
                                <Button
                                  color="warning"
                                  onClick={() => {
                                    handleChangeCancelled(item.guid);
                                    window.localStorage.setItem(
                                      item.guid,
                                      item.guid
                                    );
                                    props.refetch();
                                  }}
                                >
                                  Бекор қилиш
                                </Button>
                              </td>
                            </tr>
                          );
                        }
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

export default OrderTable;
