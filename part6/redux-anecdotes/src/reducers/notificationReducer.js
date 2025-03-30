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
    errorNotification(state, action) {
      return action.payload || "Something went wrong, Please try again later!";
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const {
  voteNotification,
  creationNotification,
  resetNotification,
  errorNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
