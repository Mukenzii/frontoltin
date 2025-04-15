import React, { useState } from 'react';
import { Col, Card, CardBody, Row } from "reactstrap";

const Orders = (props) => {

    const [state] = useState([
        { icon: "ri-stack-line" },
        { icon: "ri-store-2-line" },
        { icon: "ri-briefcase-4-line" },
    ]);
    return (
        <React.Fragment>
            <Row className='p-0 m-0'>
                <h4 className="mb-3 mt-5">Буюртмалар</h4>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-3">Ўтган ойдан бери:</p>
                                    <h6 className="ms-2"> Буюртма суммаси: {props.statistics?.since_last_month?.order_amount}</h6>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                        <CardBody className="border-top py-3">
                            <div className="text-truncate">
                                <h6 className="ms-2"> Буюртмалар сони: {props.statistics?.since_last_month?.order_count}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-3">Ўтган ҳафтадан бери:</p>
                                    <h6 className="ms-2"> Буюртма суммаси: {props.statistics?.since_last_week?.order_amount}</h6>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                        <CardBody className="border-top py-3">
                            <div className="text-truncate">
                                <h6 className="ms-2"> Буюртмалар сони: {props.statistics?.since_last_week?.order_count}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-3">Бугун:</p>
                                    <h6 className="ms-2"> Буюртма суммаси: {props.statistics?.today?.order_amount}</h6>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                        <CardBody className="border-top py-3">
                            <div className="text-truncate">
                                <h6 className="ms-2"> Буюртмалар сони: {props.statistics?.today?.order_count}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="my-3"><span className='h5 bg-success text-truncate p-2 rounded'>Умумий сони: {props?.statistics?.total_orders?.order_count} </span></Col>
                <Col md={4} className="my-3"><span className='h5 bg-success text-truncate p-2 rounded'>Умумий суммаси: {props?.statistics?.total_orders?.order_amount} </span></Col>
            </Row>
        </React.Fragment >
    );
}

export default Orders;