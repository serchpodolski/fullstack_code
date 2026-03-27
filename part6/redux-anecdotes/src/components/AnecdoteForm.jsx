import { useDispatch } from "react-redux";
// import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";
// import anecdoteService from "../services/anecdotes";
import { appendAnecdote } from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(content))
    dispatch(showNotification(`a new anecdote '${content}' added`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm