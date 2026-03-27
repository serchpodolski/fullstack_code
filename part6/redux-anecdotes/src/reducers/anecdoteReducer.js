import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    createAnecdote(state, action){
      // const content = action.payload
      // state.push({
      //   content,
      //   id: getId(),
      //   votes: 0
      // })
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})

const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(vote(updatedAnecdote))
  }
}


// export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer



// const anecdoteReducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)
//   switch (action.type) {
//     case 'VOTE':
//       // console.log("VOTED" + action.payload.id)
//       // console.log(state) 
//       return state.map(anecdote => 
//         anecdote.id === action.payload.id
//           ? { ...anecdote, votes: anecdote.votes + 1 }
//           : anecdote).sort((a, b) => b.votes - a.votes)
//     case 'NEW_NOTE':
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id
//     }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }



// export default anecdoteReducer
