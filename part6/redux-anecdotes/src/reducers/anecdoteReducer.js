import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteForAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },
  },
});

// OLD REDUCER IMPLEMENTATION VIA combineReducers
// const anecdoteReducerold = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_ANECDOTE":
//       if (action.payload?.content) {
//         return state.concat(action.payload);
//       }
//       return state;
//     case "VOTE_FOR_ANECDOTE":
//       const payload = action.payload;
//       if (!payload?.id) {
//         return state;
//       }
//       const tempAnecdote = state.map((anecdote) => {
//         if (anecdote.id === payload.id) {
//           anecdote.votes += 1;
//         }
//         return anecdote;
//       });
//       return tempAnecdote;
//     default:
//       return state;
//   }
// };

// export const createAnecdote = (content) => {
//   return {
//     type: "ADD_ANECDOTE",
//     payload: {
//       content,
//       votes: 0,
//       id: getId(),
//     },
//   };
// };

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE_FOR_ANECDOTE",
//     payload: {
//       id,
//     },
//   };
// };

export const { setAnecdotes, createAnecdote, voteForAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
