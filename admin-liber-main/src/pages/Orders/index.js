import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import OrderList from "./Orders";

class Orders extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <OrderList />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Orders;
