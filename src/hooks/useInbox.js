import { mailActions } from "../store/mail-slice";
import { useDispatch } from "react-redux";

export const useDeleteMail = (userEmail) => {
  const dispatch = useDispatch();
  const handleDeleteEmail = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("deleting message from inbox failed");
      }
      dispatch(mailActions.removeMailFromInbox(id));
    } catch (error) {
      alert(error.message);
    }
  };
  return handleDeleteEmail;
};
export const useMailClick = (userEmail) => {
  const dispatch = useDispatch();
  const handleMailClick = async (id) => {
    try {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isRead: true }),
          headers: { "Content-type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("updating message status from non read to read failed");
      }
      dispatch(mailActions.updateInboxMail(id));
    } catch (error) {
      alert(error.message);
    }
  };
  return handleMailClick;
};
