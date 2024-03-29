import { useEffect } from "react";
import { fetchMail, fetchInbox } from "../store/mail-actions";
import { useDispatch } from "react-redux";

export const useFetchMail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMail());
  }, [dispatch]);
};

export const useFetchInbox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchInbox());
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);
};
