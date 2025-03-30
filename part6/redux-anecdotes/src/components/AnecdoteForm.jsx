import { useDispatch } from "react-redux";
import { useState } from "react";

import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  creationNotification,
  errorNotification,
} from "../reducers/notificationReducer";
import { createNewAnecdote } from "../service";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [anecdoteText, setAnecdoteText] = useState("");

  const onChangeContent = (event) => {
    setAnecdoteText(event.target.value);
  };

  const onSubmit = async (event) => {
    if (!anecdoteText) {
      return;
    }
    event.preventDefault();
    try {
      const response = await createNewAnecdote(anecdoteText);
      dispatch(createAnecdote(response));
      setAnecdoteText("");
    } catch (err) {
      dispatch(errorNotification());
    }
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
        <button disabled={!anecdoteText} type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
