import React, { Component } from "react";
import Default from "../../assets/images/default.png";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

class ResponsiveTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Tables", link: "#" },
        { title: "Responsive Table", link: "#" },
      ],
    };
  }

  toNormalDate(isoDate) {
    const date = new Date(isoDate);
    const formatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const dateString = date
      .toLocaleDateString("en-US", formatOptions)
      .replace(",", "");
    return dateString;
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="mb-4 fw-bolder px-2 text-start">Пул ўтказмалари</h3>
        <Row className="p-0 m-0">
          <Col xs={12}>
            <Card>
              <CardBody>
                <div className="table-rep-plugin">
                  <div
                    className="table-responsive mb-0"
                    data-pattern="priority-columns"
                  >
                    <Table id="tech-companies-1" striped bordered responsive>
                      <thead>
                        <tr>
                          <th>Профиль фотосурати</th>
                          <th data-priority="1">Исми</th>
                          <th data-priority="3">Ҳолати</th>
                          <th data-priority="1">Пул ўтказмалари турлари</th>
                          <th data-priority="3">Нархи</th>
                          <th data-priority="3">Санаси</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.props?.map((item, index) => {
                          return (
                            <tr key={item.guid}>
                              <th>
                                <img
                                  alt={item?.owner?.profile_picture?.substring(
                                    0,
                                    10
                                  )}
                                  width={20}
                                  src={item?.owner?.profile_picture || Default}
                                />
                              </th>
                              <td>
                                <Link to={`/user/:${item?.owner?.guid}`}>
                                  {item?.owner?.first_name}
                                </Link>
                              </td>
                              <td>
                                {item?.is_paid ? (
                                  <span className="p-1 text-light rounded bg-success">
                                    Тўланган
                                  </span>
                                ) : (
                                  <span className="p-1 text-light rounded bg-danger">
                                    Тўланмаган
                                  </span>
                                )}
                              </td>
                              <td>{item?.transaction_type}</td>
                              <td>{item?.total_price}</td>
                              <td>{this.toNormalDate(item.created_at)}</td>
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
  }
}

export default ResponsiveTables;
