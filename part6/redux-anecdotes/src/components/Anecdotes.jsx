import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
// import anecdoteService from "../services/anecdotes";


const Anecdote = ( { anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  // const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes })=> {
    return anecdotes.filter(anecdote => {
      // console.log(anecdote.content)
      // console.log(filter)
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }).sort((a, b) => {
      return b.votes - a.votes})
  })

  const handleVote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    // const response = await anecdoteService.update(updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
    dispatch(showNotification(`you voted '${updatedAnecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default Anecdotes
