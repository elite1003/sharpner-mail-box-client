import { mailActions } from "./mail-slice";

const userEmail = JSON.parse(localStorage.getItem("email"));
export const fetchMail = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch email data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const emailData = await fetchData();
      const fetchedSentMail = [];
      let totalSentMail = 0;
      for (const key in emailData.sent) {
        const element = emailData.sent[key];
        if (Object.hasOwnProperty.call(emailData.sent, key)) {
          fetchedSentMail.push({ id: key, ...element });
          totalSentMail++;
        }
      }
      const fetchedInboxMail = [];
      let totalUnreadInboxMail = 0;
      for (const key in emailData.inbox) {
        const element = emailData.inbox[key];
        if (Object.hasOwnProperty.call(emailData.inbox, key)) {
          fetchedInboxMail.push({ id: key, ...element });
        }
        if (!element.isRead) {
          totalUnreadInboxMail++;
        }
      }
      dispatch(
        mailActions.initMail({
          sent: fetchedSentMail,
          inbox: fetchedInboxMail,
          totalSentMail,
          totalUnreadInboxMail,
        })
      );
    } catch (error) {
      alert(error.message);
    }
  };
};
