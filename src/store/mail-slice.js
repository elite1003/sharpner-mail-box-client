import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: { sent: [], inbox: [] },
  reducers: {
    initMail(state, action) {
      state.sent = action.payload.sent;
      state.inbox = action.payload.inbox;
    },
    addMailToSent(state, action) {
      state.sent.push(action.payload.mail);
    },
    addMailToInbox(state, action) {
      state.inbox.push(action.payload.mail);
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
