import { useState } from 'react'
import { useBlogActions, useBlogs } from '../../stores/blogStore'
import { useSetNotification, useClearNotification } from '../../stores/notificationStore'
import { useField } from '../hooks'
import '../styles/formStyles.css'

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const { createBlog } = useBlogActions()
  const blogs = useBlogs()
  const setNotification = useSetNotification()
  const clearNotification = useClearNotification()

  const addBlog = async (event) => {
    event.preventDefault()

    const success = createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    if (success) {
      resetTitle()
      resetAuthor()
      resetUrl()
      setNotification(`Blog ${title.value} by ${author.value} added`, 'success')
      setTimeout(() => clearNotification(), 5000)
      // toggleVisibility()
    }
  }

  return (
    <div className="blog-form-ctn">
      <h2>Create new</h2>
      <form onSubmit={addBlog} className="blog-form">
        <div>
          <label>title:</label>
          <input {...title} />
        </div>
        <div>
          <label>author:</label>
          <input {...author} />
        </div>
        <div>
          <label>url:</label>
          <input {...url} />
        </div>
        <div className="submit-btn-ctn">
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
