import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Category from "./Category";

class Categories extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <Category />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Categories;
