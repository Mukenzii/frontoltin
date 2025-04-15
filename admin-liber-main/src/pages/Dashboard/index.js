import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { API_URL } from "../../configs/app.config";
import BookTypes from "./BookTypes";
import Category from "./Category";
import Orders from "./Orders";
import Users from "./Users";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Liber", link: "/" },
                { title: "Dashboard", link: "#" },
            ],
            reports: [
                { icon: "ri-stack-line", title: "Number of Sales", value: "1452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-store-2-line", title: "Sales Revenue", value: "$ 38452", rate: "2.4%", desc: "From previous period" },
                { icon: "ri-briefcase-4-line", title: "Average Price", value: "$ 15.4", rate: "2.4%", desc: "From previous period" },
            ],
            bookTypes: {},
            categories: {},
            orders: {},
            users: {}


        }
    }
    componentDidMount() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Token 6c6db5188cfb9c2b75d7081b6d1351f94728059e");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${API_URL}api/v1/statistics/on_book_type/`, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ bookTypes: result }))
            .catch(error => console.log('error', error));

        fetch(`${API_URL}api/v1/statistics/on_category/`, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ categories: result }))
            .catch(error => console.log('error', error));

        fetch(`${API_URL}api/v1/statistics/on_order/`, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ orders: result }))
            .catch(error => console.log('error', error));

        fetch(`${API_URL}api/v1/statistics/on_user/`, requestOptions)
            .then(response => response.json())
            .then(result => this.setState({ users: result }))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <BookTypes statistics={this.state.bookTypes} />
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <Category statistics={this.state.categories} />
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <Orders statistics={this.state.orders} />
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <Users statistics={this.state.users} />
                                </Row>

                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
