import { createSlice } from "@reduxjs/toolkit";

const MailState = {
  mail: [],
  toggle: true,
  selectedMailId: null, // State for selected mail ID
  unreadeCount: 0, //localStorage.setItem('mailState',JSON.stringify(state))
};

const MailSlice = createSlice({
  name: "MailBox",
  initialState: MailState,
  reducers: {
    addMail(state, action) {
      state.mail.push(action.payload);
      if (!action.payload.read) {
        state.unreadeCount += 1;
      }
    },
    toggleCompose(state) {
      state.toggle = !state.toggle;
    },
    getMail(state, action) {
      state.mail = [...action.payload];
      state.unreadeCount = action.payload.filter((mail) => !mail.read).length;
    },
    selectMail(state, action) {
      state.selectedMailId = action.payload;
      const selectMail = state.mail.find((mail) => mail.id === action.payload);
      if (selectMail && !selectMail.read) {
        selectMail.read = true;
        state.unreadeCount -= 1;
        // localStorage.setItem('mailState',JSON.stringify(selectMail.read))
      }
    },
    clearSelectedMail(state) {
      state.selectedMailId = null; // Clear selected mail ID
    },
    deleteMail(state,action){
    state.mail = state.mail.filter((mail)=> mail.id !== action.payload.id )
    }
  },
});

export const mailAction = MailSlice.actions;
export const mailReducer = MailSlice.reducer;
