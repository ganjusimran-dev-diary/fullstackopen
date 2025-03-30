import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAnecdotes, voteForAnedote } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";
import { getAllAnecdotes } from "../service";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const fetchAnecdotes = async () => {
    try {
      const response = await getAllAnecdotes();
      dispatch(setAnecdotes(response.sort((a1, a2) => a2.votes - a1.votes)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnecdotes();
  }, []);

  const vote = (id, content) => {
    dispatch(voteForAnedote(id));
    dispatch(voteNotification(content));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => {
        if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>
                  vote
                </button>
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
