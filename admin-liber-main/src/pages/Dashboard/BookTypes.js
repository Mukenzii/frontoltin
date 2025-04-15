import React, { useState } from 'react';
import { Col, Card, CardBody, Row } from "reactstrap";

const BookTypes = (props) => {

    const [state] = useState([
        { icon: "ri-stack-line" },
        { icon: "ri-store-2-line" },
        { icon: "ri-briefcase-4-line" },
    ]);
    return (
        <React.Fragment>
            <Row className='p-0 m-0'>
                <h4 className="mb-3">Аудио китоблар</h4>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ойдан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.audio?.since_last_month}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ҳафтадан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.audio?.since_last_week}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[1].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Бугун:</p>
                                    <h4 className="mb-0">{props?.statistics?.audio?.today}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[2].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='p-0 m-0'>
                <h4 className="mb-3">Электрон китоблар</h4>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ойдан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.online?.since_last_month}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ҳафтадан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.online?.since_last_week}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[1].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Бугун:</p>
                                    <h4 className="mb-0">{props?.statistics?.online?.today}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[2].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='p-0 m-0'>
                <h4 className="mb-3">Қоғоз китоблар</h4>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ойдан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.paper?.since_last_month}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i></div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ҳафтадан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.audio?.since_last_week}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[1].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Бугун:</p>
                                    <h4 className="mb-0">{props?.statistics?.paper?.today}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[2].icon + " font-size-24"}></i></div>

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Col md={2} className="my-3"><span className='h5 bg-success text-truncate p-2 rounded'>Умумий сони: {props?.statistics?.total_count} </span></Col>
        </React.Fragment>
    );
}

export default BookTypes;