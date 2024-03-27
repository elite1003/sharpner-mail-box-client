import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMail } from "./store/mail-actions";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMail());
  }, [dispatch]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
