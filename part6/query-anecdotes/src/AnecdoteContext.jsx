import { createContext, useReducer } from 'react'

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case 'CREATED':
      console.log('created')
      return action.payload
    case 'VOTE':
      console.log('voted')
      return action.payload
    case 'CLEAR':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [anecdote, anecdoteDispatch] = useReducer(anecdoteReducer, '')

  return (
    <AnecdoteContext.Provider value={{ anecdote, anecdoteDispatch }}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext