import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { anecdote } = useContext(AnecdoteContext)
  if (!anecdote) {
    return null
  }

  // if (true) return null

  return (
    <div style={style}>
      {anecdote}
    </div>
  )
}

export default Notification
