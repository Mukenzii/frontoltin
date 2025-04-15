import React from "react";
import { Container, Row, Col } from "reactstrap";
import UserCridentionals from "./UserCridentionals";




const UserDetails = () => {

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xl={12}>
                            <Row>
                                <UserCridentionals />
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default UserDetails;
