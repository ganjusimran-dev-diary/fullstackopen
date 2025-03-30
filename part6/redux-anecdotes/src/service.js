import axios from "axios";
import {
  setAnecdotes,
  createAnecdote,
  voteForAnecdote,
} from "./reducers/anecdoteReducer";
import {
  creationNotification,
  errorNotification,
  voteNotification,
} from "./reducers/notificationReducer";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const getAllAnecdotes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseUrl);
      dispatch(
        setAnecdotes(response.data?.sort((a1, a2) => a2.votes - a1.votes))
      );
    } catch (err) {
      dispatch(errorNotification());
    }
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(baseUrl, asObject(content));
      dispatch(createAnecdote(response.data));
      dispatch(creationNotification(anecdote?.content));
    } catch (err) {
      dispatch(errorNotification());
    }
  };
};

export const voteAnecdote = (anecdote) => {
  const tempAnecdote = { ...anecdote };
  tempAnecdote.votes += 1;
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${baseUrl}/${tempAnecdote.id}`,
        tempAnecdote
      );
      dispatch(voteForAnecdote(response.data));
      dispatch(voteNotification(anecdote?.content));
    } catch (err) {
      dispatch(errorNotification());
    }
  };
};
