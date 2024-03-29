import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useSignUp = (
  emailInputRef,
  passwordInputRef,
  confirmPasswordInputRef
) => {
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
  return signUpFormSubmitHandler;
};
