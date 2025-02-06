import { createSlice } from '@reduxjs/toolkit';
import { authStatus } from '../api/authApi'; // Import authStatus API function

export const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

const initialState = {
    isAuthenticated: false,
    user: null,
    role: null,
    error: null,
    status: STATUS.IDLE,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = STATUS.LOADING;
        },

        loginSuccess: (state, action) => {
            state.status = STATUS.SUCCESS;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.error = null;
        },

        loginFailure: (state, action) => {
            state.status = STATUS.ERROR;
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
            state.error = action.payload;
        },

        logout: (state) => {
            state.status = STATUS.IDLE;
            state.isAuthenticated = false;
            state.user = null;
            state.role = null;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;

// Async function to check authentication status
export const checkAuthStatus = () => async (dispatch) => {
    try {
        const response = await authStatus(); // Call the API
        console.log(response)
        const r =response.role[0];
        dispatch(loginSuccess({ user: response.user, role: r }));
    } catch (error) {
        console.log(error)
        dispatch(loginFailure("Unauthorized")); // Set state to not authenticated
    }
};
