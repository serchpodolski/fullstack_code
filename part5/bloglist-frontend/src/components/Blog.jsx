import { useState } from 'react'


const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog-item'>
      {blog.title} {blog.author}
      <button onClick={() => toggleDetails()}>{showDetails ? 'hide' : 'view'}</button>
      {
        showDetails &&
        <div>
          <div className='url'><a href={blog.url}>{blog.url}</a></div>
          <div className='likes-count-class'>
            {blog.likes} likes
            <button onClick={() => updateBlog(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            { 
              user?.name === blog.user.name &&
              <button onClick={() => removeBlog(blog)}>remove</button>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Blog