import {createSlice} from '@reduxjs/toolkit'

const AuthState = {
token:localStorage.getItem("token") || null,
isAuthenticated : !!localStorage.getItem('token'),
toggleAuth:false
}

const AuthSlice = createSlice({
    name:'authentication',
    initialState: AuthState,
    reducers:{
        login(state,action){
        state.token = action.payload
        state.isAuthenticated = true
        localStorage.setItem("token",action.payload)
        },
        logout(state){
            state.token = null
            state.isAuthenticated = false;
            localStorage.removeItem("token")
        },
        toggleAuth(state){
            state.toggleAuth = !state.toggleAuth
        }
        
    }
})


export const authAction = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;