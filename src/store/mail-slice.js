import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sent: [],
    inbox: [],
    totalUnreadInboxMail: 0,
    totalSentMail: 0,
  },
  reducers: {
    initMail(state, action) {
      state.sent = action.payload.sent;
      state.inbox = action.payload.inbox;
      state.totalUnreadInboxMail = action.payload.totalUnreadInboxMail;
      state.totalSentMail = action.payload.totalSentMail;
    },
    addMailToSent(state, action) {
      state.sent.push(action.payload);
      state.totalSentMail++;
    },
    addMailToInbox(state, action) {
      state.inbox.push(action.payload);
      state.totalUnreadInboxMail++;
    },
    updateInboxMail(state, action) {
      const mailIndex = state.inbox.findIndex(
        (mail) => mail.id === action.payload
      );
      if (!state.inbox[mailIndex].isRead) {
        state.inbox[mailIndex].isRead = true;
        state.totalUnreadInboxMail--;
      }
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
