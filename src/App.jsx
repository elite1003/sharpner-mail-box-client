import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMail, fetchInbox } from "./store/mail-actions";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMail());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchInbox());
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
