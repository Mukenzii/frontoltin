/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Col, Card, CardBody, Row } from "reactstrap";

const Users = (props) => {

    const [state, setState] = useState([
        { icon: "ri-stack-line" },
        { icon: "ri-store-2-line" },
        { icon: "ri-briefcase-4-line" },
    ]);
    return (
        <React.Fragment>
            <Row className='p-0 m-0'>
                <h4 className="mb-3 mt-5">Users</h4>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Ўтган ойдан бери:</p>
                                    <h4 className="mb-0">{props?.statistics?.since_last_month}</h4>
                                </div>
                                <div className="text-primary">
                                    <i className={state[0].icon + " font-size-24"}></i>
                                </div>
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
                                    <h4 className="mb-0">{props?.statistics?.since_last_week}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[1].icon + " font-size-24"}></i>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <CardBody>
                            <div className="d-flex">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-truncate font-size-14 mb-2">Bugun:</p>
                                    <h4 className="mb-0">{props?.statistics?.today}</h4>
                                </div>

                                <div className="text-primary">
                                    <i className={state[2].icon + " font-size-24"}></i>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Col md={2} className="mt-3 mb-5"><span className='h5 bg-success text-truncate p-2 rounded'>Умумий сони: {props?.statistics?.total_count} </span></Col>
        </React.Fragment >
    );
}

export default Users;