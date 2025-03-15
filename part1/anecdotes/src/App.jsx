import { AnecdoteSection } from './components/molecules';
import useAnecdoteHelper from './useAnecdoteHelper'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];
const ANECDOTE_VOTE_AND_GENERATE = 'Anecdote of the day';
const ANECDOTE_MOST_VOTES = 'Anecdote with most votes';

const App = () => {
  const {
    selected,
    vote,
    anecdoteActions,
    maxVoted,
  } = useAnecdoteHelper(anecdotes?.length);

  return (
    <div>
      <AnecdoteSection
        title={ANECDOTE_VOTE_AND_GENERATE}
        text={anecdotes[selected]}
        votesForCurrent={vote[selected]}
        actions={anecdoteActions}
      />
      {
        maxVoted?.index >= 0 && (
          <AnecdoteSection
            title={ANECDOTE_MOST_VOTES}
            text={anecdotes[maxVoted?.index]}
            votesForCurrent={maxVoted?.count}
          />
        )
      }

    </div>
  )
}

export default App
