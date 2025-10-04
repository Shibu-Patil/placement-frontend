import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice"
import graphReducer from "../slices/GraphSlice"

export const store =configureStore({
    reducer:{
        authReducer:AuthReducer,
        graphReducer:graphReducer
        
    }
})