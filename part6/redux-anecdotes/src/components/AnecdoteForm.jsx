import { useDispatch } from "react-redux";
import { useState } from "react";

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
    dispatch(createNewAnecdote(anecdoteText));
    setAnecdoteText("");
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
