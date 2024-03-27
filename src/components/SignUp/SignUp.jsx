import React, { useRef } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;
    if (
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0 &&
      password === confirmPassword
    ) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBK8Hfm1ccNpEEMJ0Zi6Og3o-jwrbwt-JM",
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
          throw new Error("User Exist");
        }
        const data = await response.json();
        dispatch(
          authActions.login({
            token: data.idToken,
            email: email.replace(/[@.]/g, ""),
          })
        );
        navigate("/home");
      } catch (error) {
        alert(error.message);
      }

      emailInputRef.current.value = 0;
      passwordInputRef.current.value = 0;
      confirmPasswordInputRef.current.value = 0;
    }
  };
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

export default SignUp;
