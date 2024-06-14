import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth";
import { mailReducer } from "./Mail";

const store = configureStore({
    reducer:{auth:authReducer, mail:mailReducer}
})

export default store