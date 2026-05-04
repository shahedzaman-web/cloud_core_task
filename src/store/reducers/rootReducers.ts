import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import authSlice from "../slices/authSlice";
export default combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.name]: authSlice
});