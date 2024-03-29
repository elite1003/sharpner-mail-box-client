import { mailActions } from "../store/mail-slice";
import { useDispatch } from "react-redux";

export const useDeleteMail = (userEmail) => {
  const dispatch = useDispatch();
  const handleDeleteEmail = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/sent/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("deleting message from sent failed");
      }
      dispatch(mailActions.removeMailFromSent(id));
    } catch (error) {
      alert(error.message);
    }
  };
  return handleDeleteEmail;
};
