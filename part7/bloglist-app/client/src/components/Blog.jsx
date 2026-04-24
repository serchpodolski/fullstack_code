import { useState } from 'react'
import { useBlogActions, useBlogs} from '../../stores/blogStore'
import { useSetNotification, useClearNotification } from '../../stores/notificationStore'
import { BiSolidLike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { useUser } from '../../stores/usersStore';
import { MdOutlineDeleteSweep } from "react-icons/md";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [comment, setComment] = useState('')
  const { likeBlog, removeBlog, commentBlog } = useBlogActions()
  const setNotification = useSetNotification()
  const clearNotification = useClearNotification()
  const loggedUser = useUser()

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const postComment = (event) => {
    event.preventDefault()
    if(comment.length === 0){
      setNotification('Comment cannot be empty', 'error')
      setTimeout(() => clearNotification(), 3000)
      return
    }
    commentBlog(blog, comment)
    setNotification(`Comment: ${comment}, added`, 'success')
    setTimeout(() => clearNotification(), 3000)
    setComment('')
  }
  const notifyLike = (action, delayTime = 1000) => {
    setNotification(`Blog ${blog.title} by ${blog.author} ${action}!`, 'success')
    setTimeout(() => clearNotification(), delayTime)
  }

  // throw new Error('Blog component error') // For testing ErrorBoundary
  return (
    <div style={blogStyle} className="blog-item-ctn">
      <div className="title-ctn">
        <div>
          <h1>{blog.title}</h1> 
          <h2>by {blog.author} </h2>
        </div>
        <button onClick={() => toggleDetails()}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
        {showDetails && (
          <div className="details-ctn">
            <div className="url">
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="user-name">Added by {blog.user.name}</div>
            <div className="likes-count-class">
              <h3>{blog.likes} likes</h3>
              <button onClick={() => {
                likeBlog(blog)
                notifyLike('liked')
              }}>
                <BiSolidLike className="like-icon" />
              </button>
              <div>
                {
                blog.user.name === loggedUser.name && (
                <button onClick={() => removeBlog(blog)}><MdOutlineDeleteSweep className="delete-icon" /></button>
                )
                }
              </div>
            </div>
            <div className="comments-ctn">
              <div className="comments-list-ctn">
                <h2>Comments</h2>
                {blog.comments.length === 0 ? (
                  <p>No comments yet</p>
                ) : (
                  <ul>
                    {blog.comments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="comment-form-ctn">
                <input type="text" placeholder="Add a comment" 
                  onChange={(e)=> {
                    setComment(e.target.value)
                  }} 
                  value={comment} />
                <button onClick={postComment}><FaCommentDots className="comment-icon"/></button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Blog
