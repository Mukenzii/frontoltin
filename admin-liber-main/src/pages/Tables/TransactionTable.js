import React, { Component } from "react";

import { Row, Col, Card, CardBody, Table } from "reactstrap";

class TransactionTable extends Component {
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
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        const dateString = date.toLocaleDateString('en-US', formatOptions).replace(',', '');
        return dateString
    }

    render() {
        return (
            <React.Fragment>
                <h5 className="mb-4 fw-bolder px-2 text-start">Пул ўтказмалари</h5>
                <Row className="p-0 m-0">
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <div className="table-rep-plugin">
                                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                                        <Table id="tech-companies-1" striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th data-priority="3">Пул ўтказмалари турлари</th>
                                                    <th data-priority="3">Ҳолати</th>
                                                    <th data-priority="3">Умумий нарх</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.data?.transactions?.length ? this.props.data?.transactions?.map((item, index) => {
                                                    return <tr key={index}>
                                                        <td>{item?.transaction_type}</td>
                                                        <td>{item?.is_paid ? <span className="p-1 text-light rounded bg-success">Тўланган</span> : <span className="p-1 text-light rounded bg-danger">Тўланмаган</span>}</td>
                                                        <td>{item?.total_price}</td>
                                                    </tr>
                                                }) : <tr><td colSpan={12}>Маълумотлар етарли эмас</td></tr>}
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

export default TransactionTable;
