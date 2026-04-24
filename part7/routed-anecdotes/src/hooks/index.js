import { useState, useEffect } from 'react';
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
      anecdoteService
        .getAll()
        .then(anecdotes => setAnecdotes(anecdotes))
    }, [])
    console.log(anecdotes)

    const addAnecdote = async (content) => {
        const newAnecdote = await anecdoteService.createNew(content)
        setAnecdotes([...anecdotes, newAnecdote])
    }

    const deleteAnecdote = async (id) => {
        await anecdoteService.deleteAnecdote(id)
        setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    }


    return { anecdotes, addAnecdote, deleteAnecdote }
}

