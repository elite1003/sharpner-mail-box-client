import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";

test("renders SignUp header", () => {
  render(<SignUp />);
  const headerElement = screen.getByText(/SignUp/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders email input", () => {
  render(<SignUp />);
  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
});

test("renders password input", () => {
  render(<SignUp />);
  const passwordInput = screen.getByLabelText(/Password/i);
  expect(passwordInput).toBeInTheDocument();
});

test("renders confirm password input", () => {
  render(<SignUp />);
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
  expect(confirmPasswordInput).toBeInTheDocument();
});

test("renders sign up button", () => {
  render(<SignUp />);
  const signUpButton = screen.getByText(/Sign Up/i);
  expect(signUpButton).toBeInTheDocument();
});
