import React from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="home">
          Home{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            {isLoggedIn ? (
              <div className="d-flex justify-content-between w-100">
                <Nav.Link as={Link} to="mail">
                  Mail
                </Nav.Link>
                <Button
                  variant="secondary "
                  onClick={() => dispatch(authActions.logout())}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
