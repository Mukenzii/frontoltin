import React, { Component } from "react";
import { Button, Collapse, Container } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
//i18n
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({});
    }
  }

  componentDidMount() {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div className="topnav">
          <Container fluid>
            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu"
              id="navigation"
            >
              <Collapse
                isOpen={this.props.menuOpen}
                className="navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <i className="ri-dashboard-line me-2"></i>{" "}
                      {"Бошқарув панели"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      <i className="ri-menu-line me-2"></i> {"Категориялар"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      <i className="ri-user-line me-2"></i> {"Фойдаланувчилар"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">
                      <i className="ri-line-chart-line me-2"></i>{" "}
                      {"Пул ўтказмалари"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/transactions">
                      <i className="ri-book-line me-2"></i> {"Китоблар"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      <i className="ri-window-line me-2"></i> {"Буюртмалар"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recommendation">
                      <i className="ri-compass-line me-2"></i> {"Тавсиялар"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Button className="nav-link" to="/recommendation">
                      <i className="ri-compass-line me-2"></i> {"Чиқиш"}
                    </Button>
                  </li>
                </ul>
              </Collapse>
            </nav>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { leftSideBarType, leftSideBarTheme } = state.Layout;
  return { leftSideBarType, leftSideBarTheme };
};

export default withRouter(connect(mapStatetoProps, {})(Navbar));
