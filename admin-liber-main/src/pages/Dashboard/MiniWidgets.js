import React, { Component } from 'react';
import { Col, Card, CardBody } from "reactstrap";

class MiniWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [
                { icon: "ri-stack-line" },
                { icon: "ri-store-2-line" },
                { icon: "ri-briefcase-4-line" },
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.state.reports.map((icon, index) =>
                    <Col key={index} md={4}>
                        <Card>
                            <CardBody>
                                <div className="d-flex">
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-truncate font-size-14 mb-2">{ }</p>
                                        <h4 className="mb-0">{ }</h4>
                                    </div>

                                    <div key={index} className="text-primary">
                                        <i className={icon.icon + " font-size-24"}></i></div>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>)
                }
                <Col md={2} className="my-3"><span className='h5 bg-success text-truncate p-2 rounded'>Total Count: { } </span></Col>
            </React.Fragment>
        );
    }
}

export default MiniWidgets;