import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLoginSubmit = (emailInputRef, passwordInputRef) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyUser = async (email, password) => {
    try {
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
      navigate("/mail");
    } catch (error) {
      alert(error.message);
    }
  };
  const LoginFormSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (email.trim().length > 0 && password.trim().length > 0) {
      verifyUser(email, password);
    }
  };
  return LoginFormSubmitHandler;
};
