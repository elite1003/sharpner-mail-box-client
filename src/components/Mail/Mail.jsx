import React from "react";
import { Button, Navbar, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const Mail = () => {
  const totalUnreadInboxMail = useSelector(
    (state) => state.mail.totalUnreadInboxMail
  );
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Mail App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form style={{ width: "90%" }}>
            <Row>
              <Col style={{ flexGrow: 1, marginRight: "10px" }}>
                <Form.Control type="text" placeholder="Search" />
              </Col>
              <Col xs="auto">
                <Button variant="outline-success">Search</Button>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "20%",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="dark"
            size="lg"
            style={{ marginBottom: "10px" }}
            active
          >
            <Link
              to={`compose`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Compose Mail
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            style={{ marginBottom: "10px" }}
          >
            <Link
              to={`inbox`}
              style={{ color: "#8ed49f", textDecoration: "none" }}
            >
              Inbox
            </Link>
            {"  "}
            {totalUnreadInboxMail}
          </Button>
          <Button variant="warning" size="lg" style={{ marginBottom: "10px" }}>
            <Link
              to={`sent`}
              style={{ color: "#9347bf", textDecoration: "none" }}
            >
              Sent
            </Link>
          </Button>
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Mail;
