import React, { useRef } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useSignUp } from "../../hooks/useSignUp";
const SignUp = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const signUpFormSubmitHandler = useSignUp(
    emailInputRef,
    passwordInputRef,
    confirmPasswordInputRef
  );
  return (
    <Card
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <Card.Body className="w-50 ">
        <Container className="p-5 border  shadow rounded">
          <Row>
            <Col>
              <h1 className="text-center mb-4">SignUp</h1>
              <Form onSubmit={signUpFormSubmitHandler}>
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
                <Form.Group id="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    ref={confirmPasswordInputRef}
                  />
                </Form.Group>
                <Button className="w-100 mt-3" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default SignUp;
