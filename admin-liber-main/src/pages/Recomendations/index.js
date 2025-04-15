import React from "react";
import { Col, Container, Row } from "reactstrap";
import CategoryRecomendation from "./category-recomendation";

const Recomendations = () => <React.Fragment>
    <div className="page-content">
        <Container fluid>
            <Row>
                <Col xl={12}>
                    <Row>
                        <CategoryRecomendation />
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
</React.Fragment>

export default Recomendations;