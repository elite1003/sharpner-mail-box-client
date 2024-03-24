import React, { useRef } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyUser = async (email, password) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    dispatch(
      authActions.login({
        token: data.idToken,
        email: email.replace(/[@.]/g, ""),
      })
    );
    navigate("/home");
  };
  const LoginFormSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (email.trim().length > 0 && password.trim().length > 0) {
      try {
        verifyUser(email, password);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <Card
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <Card.Body className="w-25 ">
        <Container className="p-5 border  shadow rounded">
          <Row>
            <Col>
              <h1 className="text-center mb-4">Login</h1>
              <Form onSubmit={LoginFormSubmitHandler}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required ref={emailInputRef} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={passwordInputRef}
                  />
                </Form.Group>
                <Button className="w-100 mt-3" type="submit">
                  Log In
                </Button>
              </Form>
              {/* <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div> */}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default LogIn;
