import React, { Component } from "react";
import Cookies from "js-cookie";
import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

class Login extends Component {
  constructor(props) {
    super(props);
    // this.state = { username: "admin@liber.com", password: "123456" };
    this.state = { error: "", loading: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event, values) {
    this.setState({
      loading: true,
    });
    if (values?.username === "admin") {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/account/user-login/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (response?.status === 200) {
          const user = await response.json();
          console.log(user);
          Cookies.set("user_token", user.access, { expires: 2 });
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            error:
              "Фойдаланувчи номи ва пароль яроқсиз. Илтимос, тўғри фойдаланувчи номи ва паролни киритинг",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        error:
          "Фойдаланувчи номи ва пароль яроқсиз. Илтимос, тўғри фойдаланувчи номи ва паролни киритинг",
      });
    }
    this.setState({
      loading: false,
    });
  }

  componentDidMount() {
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0">
            <Row className="g-0">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="">
                                <img
                                  src={logodark}
                                  alt=""
                                  height="40"
                                  className="auth-logo logo-dark mx-auto"
                                />
                                <img
                                  src={logolight}
                                  alt=""
                                  height="40"
                                  className="auth-logo logo-light mx-auto"
                                />
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">
                              Хуш келибсиз !
                            </h4>
                            <p className="text-muted">
                              Либерга ўтиш учун тизимга киринг.
                            </p>
                          </div>

                          {this.state.error.length > 0 && (
                            <Alert color="danger">{this.state.error}</Alert>
                          )}

                          <div className="p-2 mt-5">
                            <AvForm
                              className="form-horizontal"
                              onValidSubmit={this.handleSubmit}
                            >
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Электрон почта</Label>
                                <AvField
                                  name="username"
                                  // value={this.state.username}
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  validate={{ required: true }}
                                  placeholder="Username"
                                />
                              </div>

                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Пароль</Label>
                                <AvField
                                  name="password"
                                  // value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Пароль"
                                />
                              </div>

                              <div className="form-check">
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Мени эслаб қолинг
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                  disabled={this.state?.loading}
                                >
                                  {this.state?.loading ? "#####" : "Кириш"}
                                </Button>
                              </div>
                            </AvForm>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
