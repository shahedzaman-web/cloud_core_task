import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import { useSelector } from "react-redux";

interface loginResponse {
    status: boolean,
    message: string,
    data: {
        token: string,
    }
}

interface OtpResponse {
    status: boolean,
    message: string,
    data: {
        token: string,
        user_id: string,
        phone: string,
        email: string,
        name: string
    }
}

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<loginResponse>) => {
            state.isAuthenticated = true;
            state.token = action.payload.data.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiSlice.endpoints.login.matchFulfilled,
                (state, { payload }: PayloadAction<loginResponse>) => {
                    if(!payload?.data?.token) return
                    state.isAuthenticated = true;
                    state.token = payload?.data?.token;
                }
            )
            .addMatcher(
                apiSlice.endpoints.verifyOtp.matchFulfilled,
                (state, { payload }: PayloadAction<OtpResponse>) => {
                    if(!payload?.data?.token) return
                    const userPayload = {
                        id: payload.data.user_id,
                        name: payload.data.name,
                        email: payload.data.email,
                        phone: payload.data.phone
                    };

                    state.isAuthenticated = true;
                    state.token = payload.data.token;
                    state.user = userPayload;
                }
            );
    }
});

export const { login, logout } = authSlice.actions;


export default authSlice.reducer;

export const useAuthSelector = () => {
    return useSelector((state: any) => state.reducer);
}