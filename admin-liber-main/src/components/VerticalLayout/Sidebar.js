import React, { Component } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";

//Simple bar
import SimpleBar from "simplebar-react";

import SidebarContent from "./SidebarContent";
import { Button } from "reactstrap";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logout() {
    Cookies.remove("user_token")
    window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <div className="vertical-menu">
          <div data-simplebar className="" style={{ minHeight: "92%" }}>
            {this.props.type !== "condensed" ? (
              <SimpleBar style={{ maxHeight: "100%" }}>
                <SidebarContent />
              </SimpleBar>
            ) : (
              <SidebarContent />
            )}
          </div>
          <Button onClick={this.logout}>
            <i className="ri-compass-line"></i>
            <span className="ms-1">{"Чиқиш"}</span>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(mapStatetoProps, {})(withRouter(Sidebar));
