import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    updateFilter(state, action) {
      return action.payload;
    },
  },
});

// OLD REDUCER IMPLEMENTATION VIA combineReducers
// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const updateFilter = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
