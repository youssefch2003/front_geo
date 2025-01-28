// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Status constants
export const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

// Initial state with status
const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    status: STATUS.IDLE, // Default status is idle
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // This action is dispatched when login is in progress (e.g., when the form is submitted)
        loginStart: (state) => {
            state.status = STATUS.LOADING; // Set status to loading
        },

        // Action when login is successful
        loginSuccess: (state, action) => {
            state.status = STATUS.SUCCESS; // Set status to success
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },

        // Action when login fails
        loginFailure: (state, action) => {
            state.status = STATUS.ERROR; // Set status to error
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // Action to logout
        logout: (state) => {
            state.status = STATUS.IDLE; // Set status to idle
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
