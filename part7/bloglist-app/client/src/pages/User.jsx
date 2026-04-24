import { useBlogs } from "../../stores/blogStore";
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import userService from '../services/userInfo'
import '../styles/userStyles.css'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const blogs = useBlogs()
  
  useEffect(() => {
    userService.getAll().then(users => {
      const foundUser = users.find(u => u.id === id)
      setUser(foundUser)
    })
  }, [id])

  if (!user) {
    return null
  }

  const userBlogs = blogs.filter((blog) => blog.user.id === user.id)
  console.log(blogs)
  if (userBlogs.length === 0) {
    return (
      <div className="user-blogs-empty">
        <h1>{user.name} has no blogs yet</h1>
      </div>
    )
  }
  return (
    <div className="user-ctn">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul className="user-blog-ul">
        {userBlogs.map((blog) => (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default User