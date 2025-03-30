import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    voteNotification(state, action) {
      return `you voted '${action.payload}'`;
    },
    creationNotification(state, action) {
      return `you added '${action.payload}'`;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const { voteNotification, creationNotification, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
