import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useAnecdoteHelper = (totalAnecdotes) => {
    const [selected, setSelected] = useState(-1);
    const [maxVoted, setMaxVoted] = useState({ index: -1, count: 0 });
    const [vote, setVote] = useState({});


    useEffect(() => {
        generateNextAnecdote();
    }, []);

    useEffect(() => {
        if (maxVoted.index < 0) {
            setMaxVoted({ index: selected, count: 1 });
        } else if (maxVoted.index == selected) {
            setMaxVoted((prev) => (
                { index: selected, count: prev.count + 1 }
            ));
        } else if (vote[selected] > maxVoted.count) {
            setMaxVoted({ index: selected, count: vote[selected] });
        }
    }, [vote])

    const getRandomIndexForAnecdote = () => Math.floor(Math.random() * totalAnecdotes);

    const generateNextAnecdote = () => {
        setSelected(getRandomIndexForAnecdote());
    }

    const voteForAnectodeId = () => {
        setVote((prev) => {
            return {
                ...prev,
                [selected]: prev[selected] ? prev[selected] + 1 : 1
            }

        })
    }

    const anecdoteActions = useMemo(() => [
        {
            action: 'vote',
            onClick: () => voteForAnectodeId()
        },
        {
            action: 'next anecdote',
            onClick: () => generateNextAnecdote()
        }
    ], [selected, vote]);




    return {
        selected,
        vote,
        anecdoteActions,
        maxVoted
    };
};

export default useAnecdoteHelper;