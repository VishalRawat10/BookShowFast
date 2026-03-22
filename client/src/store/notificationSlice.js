import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        message: null,
        isError: false
    },
    reducers: {
        setNotification(state, action) {
            state.message = action.payload.message;
            state.isError = action.payload.isError;
        },
        clearNotification(state) {
            state.message = null;
            state.isError = false;
        }
    }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;