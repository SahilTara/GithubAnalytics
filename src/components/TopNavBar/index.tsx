import React from "react";
import { Nav } from "react-bootstrap";
import "./index.css";
import { withRouter } from "react-router";

/**
 * Top Nav Component with Home Button that goes to the
 * root location of the website
 */
const TopNavBar: React.FC = () => {
  const Home = withRouter(({ history }) => (
    <Nav.Link
      variant="outline-primary"
      onClick={() => {
        history.push("/");
      }}
      className="title"
    >
      {"Home"}
    </Nav.Link>
  ));

  return (
    <div className="wrapper">
      <Nav className="topNavBar">
        <Nav.Item className="topNavItem">
          <Home />
        </Nav.Item>
        <Nav.Item />
      </Nav>
    </div>
  );
};

export default TopNavBar;
