import { createSlice } from "@reduxjs/toolkit";

const MailState = {
  mail: [],
  send:[],
  toggle: true,
  selectedMailId: null, 
  unreadeCount: 0,
  deleted: [],
};

const MailSlice = createSlice({
  name: "MailBox",
  initialState: MailState,
  reducers: {
    addMail(state, action) {
      state.send.push(action.payload);
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
      state.selectedMailId = null; // Clear the selected mail ID
    },
    deleteMail(state,action){
      const mailToDelete = state.mail.find((mail)=> mail.id === action.payload.id );
      if (mailToDelete) {
        state.deleted.push(mailToDelete);
      }
      state.mail = state.mail.filter((mail)=> mail.id !== action.payload.id );
    },
    restoreMail(state, action) {
      const mailToRestore = state.deleted.find((mail) => mail.id === action.payload.id);
      if (mailToRestore) {
        state.mail.push(mailToRestore);
        state.deleted = state.deleted.filter((mail) => mail.id !== action.payload.id);
        fetch(`https://mail-box-1c3dd-default-rtdb.firebaseio.com/mail.json`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mailToRestore)
        });
      }
    },
  },
});

export const mailAction = MailSlice.actions;
export const mailReducer = MailSlice.reducer;
