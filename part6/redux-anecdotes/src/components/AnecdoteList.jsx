import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllAnecdotes, voteAnecdote } from "../service";

const style = { padding: 8, borderBottom: "1px dashed lightgrey" };

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const fetchAnecdotes = async () => {
    try {
      dispatch(getAllAnecdotes());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnecdotes();
  }, []);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => {
        if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <div style={style} key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default AnecdoteList;
