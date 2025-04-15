import React, { Component } from "react";

import { Row, Col, Card, CardBody, Table } from "reactstrap";

class StyledTable extends Component {
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
                <h5 className="mb-4 fw-bolder px-2 text-start">Буюртмалар</h5>
                <Row className="p-0 m-0">
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <div className="table-rep-plugin">
                                    <div className="table-responsive mb-0" data-pattern="priority-columns">
                                        <Table id="tech-companies-1" striped bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>Китоб</th>
                                                    <th data-priority="1">Тўлиқ исми</th>
                                                    <th data-priority="3">Ҳолати</th>
                                                    <th data-priority="3">Тўлов тури</th>
                                                    <th data-priority="3">Телефон рақами</th>
                                                    <th data-priority="3">Умумий нарх</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props?.data?.orders?.length ? this.props.data?.orders?.map((item, index) => {
                                                    return <tr key={index}>
                                                        <th>{item?.book}</th>
                                                        <td>{item?.full_name}</td>
                                                        <td>{item?.is_paid ? <span className="p-1 text-light rounded bg-success">Тўланган</span> : <span className="p-1 text-light rounded bg-danger">To`lanmagan</span>}</td>
                                                        <td>{item?.payment_type}</td>
                                                        <td>{item?.phone_number}</td>
                                                        <td>{item?.total_price}</td>
                                                    </tr>
                                                }) : <tr>
                                                    <td colSpan={12}>Маълумотлар етарли эмас</td>
                                                </tr>}
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

export default StyledTable;
