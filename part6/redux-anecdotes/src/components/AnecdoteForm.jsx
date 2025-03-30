import { useDispatch } from "react-redux";
import { useState } from "react";

import { createAnecdote } from "../reducers/anecdoteReducer";
import { creationNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [anecdoteText, setAnecdoteText] = useState("");

  const onChangeContent = (event) => {
    setAnecdoteText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(anecdoteText));
    setAnecdoteText("");
    dispatch(creationNotification(anecdoteText));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            onChange={onChangeContent}
            value={anecdoteText}
            placeholder="Enter new anacdote here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
