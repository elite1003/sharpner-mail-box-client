import { mailActions } from "./mail-slice";

export const fetchMail = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch mail data!");
      }
      const data = await response.json();
      return data || { sent: {}, inbox: {} };
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
        mailActions.initSentMail({
          sent: fetchedSentMail,
          totalSentMail,
        })
      );
      dispatch(
        mailActions.initInboxMail({
          inbox: fetchedInboxMail,
          totalUnreadInboxMail,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const fetchInbox = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const userEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://compose-mail-app-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmail}/inbox.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch inbox data!");
      }
      const data = await response.json();
      return data || {};
    };

    try {
      const inboxMailData = await fetchData();
      const fetchedInboxMail = [];
      let totalUnreadInboxMail = 0;
      for (const key in inboxMailData) {
        const element = inboxMailData[key];
        if (Object.hasOwnProperty.call(inboxMailData, key)) {
          fetchedInboxMail.push({ id: key, ...element });
        }
        if (!element.isRead) {
          totalUnreadInboxMail++;
        }
      }
      dispatch(
        mailActions.initInboxMail({
          inbox: fetchedInboxMail,
          totalUnreadInboxMail,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };
};
