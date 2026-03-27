import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { anecdoteDispatch } = useContext(AnecdoteContext)

  const newAnecdoteMutation = useMutation({
      mutationFn: createAnecdote,
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
        anecdoteDispatch({ type: 'CREATED', payload: `anecdote '${newAnecdote.content}' created` })
        setTimeout(() => anecdoteDispatch({ type: 'CLEAR' }), 5000)
      },
      onError: (error) => {
        const errorMessage = 'too short anecdote, must hage length 5 or more'
        anecdoteDispatch({ type: 'ERROR', payload: errorMessage })
        setTimeout(() => anecdoteDispatch({ type: 'CLEAR' }), 5000)
      }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
    console.log('new anecdote')
  }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
