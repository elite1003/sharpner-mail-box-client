import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./auth-slice";
import MailReducer from "./mail-slice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    mail: MailReducer,
  },
});

export default store;
