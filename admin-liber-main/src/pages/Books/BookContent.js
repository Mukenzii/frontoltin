import React from "react";
import { Container, Row, Col } from "reactstrap";
import BookCridentials from "./BookCridential";

const BookContent = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Row>
                <BookCridentials />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BookContent;
