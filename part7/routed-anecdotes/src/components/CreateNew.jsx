// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks/index'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()
  const navigate = useNavigate()
  const { reset:contentReset, ...content } = useField('text')
  const { reset:authorReset, ...author }   = useField('text')
  const { reset:infoReset, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({ content, author, info })
    addAnecdote({ 
      content: content.value, 
      author: author.value, 
      info: info.value, 
      votes: 0 
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input name='content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
