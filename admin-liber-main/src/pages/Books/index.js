import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Book from "./Book";

class Books extends Component {
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
                                    <Book />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Books;
