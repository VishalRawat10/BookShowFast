import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser(state, actions) {
            state.user = actions.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;