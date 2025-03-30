import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNewAnecdote = async (content) => {
  const response = await axios.post(baseUrl, asObject(content));
  return response.data;
};
