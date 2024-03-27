import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import App from "./App";
import ComposeMail from "./components/Mail/ComposeMail";
import Inbox from "./components/Mail/Inbox";
import Sent from "./components/Mail/Sent";
import Mail from "./components/Mail/Mail";
import SentMessageDetail from "./components/Mail/SentMessageDetail";
import InboxMessageDetail from "./components/Mail/InboxMessageDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "mail",
        element: <Mail />,
        children: [
          { path: "", element: <ComposeMail /> },
          { path: "inbox/:id", element: <InboxMessageDetail /> },
          { path: "inbox", element: <Inbox /> },
          { path: "sent/:id", element: <SentMessageDetail /> },
          { path: "sent", element: <Sent /> },
          { path: "compose", element: <ComposeMail /> },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
