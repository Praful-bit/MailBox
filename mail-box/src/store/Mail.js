import { createSlice } from "@reduxjs/toolkit";

const MailState = {
mail:[],
toggle:false
}

const MailSlice = createSlice({
    name:'MailBox',
    initialState:MailState,
    reducers:{
     addMail(state,action){
     state.mail.push(action.payload)
     },
     toggleCompose(state){
     state.toggle = !state.toggle
     },
     getMail(state,action){
        state.mail = [...action.payload]
     }
    }
})

export const mailAction = MailSlice.actions;
export const mailReducer = MailSlice.reducer;