import { createSlice } from "@reduxjs/toolkit";

const MailState = {
  mail: [],
  toggle: true,
  selectedMailId: null, // State for selected mail ID
};

const MailSlice = createSlice({
  name: 'MailBox',
  initialState: MailState,
  reducers: {
    addMail(state, action) {
      state.mail.push(action.payload);
    },
    toggleCompose(state) {
      state.toggle = !state.toggle;
    },
    getMail(state, action) {
      state.mail = [...action.payload];
    },
    selectMail(state, action) {
      state.selectedMailId = action.payload; 
    },
    clearSelectedMail(state) {
      state.selectedMailId = null; // Clear selected mail ID
    },
  },
});

export const mailAction = MailSlice.actions;
export const mailReducer = MailSlice.reducer;
