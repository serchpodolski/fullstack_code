import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [statusMessage, setStatusMessage] = useState({ message: null, type: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    const blogToState = {
      ...newBlog,
      user: newBlog.user.name ? newBlog.user : user 
    }
    setBlogs(blogs.concat(blogToState).sort((a, b) => b.likes - a.likes))

    setStatusMessage({ message:`Blog ${newBlog.title} by ${newBlog.author} added`, type:'success' })
    setTimeout(() => {
      setStatusMessage({ message:null, type:null })
    }, 5000)
    return true
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const changedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      const updatedBlog = await blogService.update(blogToUpdate.id, changedBlog)
      setBlogs(blogs
        .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        .sort((a, b) => b.likes - a.likes))
      setStatusMessage({ message:`Blog ${updatedBlog.title} by ${updatedBlog.author} liked!`, type:'success' })
      setTimeout(() => {
        setStatusMessage({ message:null, type:null })
      }, 5000)
    } catch (exception) {
      setStatusMessage({ message: 'Could not update blog', type: 'error' })
      setTimeout(() => setStatusMessage({ message: null, type: null }), 5000)
    }
  }

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
      try {
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter(b => b.id !== blogToRemove.id))
        setStatusMessage({ message: `Blog '${blogToRemove.title}' by ${blogToRemove.author} was removed`, type: 'success' })
        setTimeout(() => setStatusMessage({ message: null, type: null }), 5000)
      } catch {
        setStatusMessage({ message: 'Could not remove blog. You may not have permission.', type: 'error' })
        setTimeout(() => setStatusMessage({ message: null, type: null }), 5000)
      }
    }
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try{
      const user = await loginService.login({
        username: username,
        password: password
      })
      console.log('setting local storage')
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      // console.log(user)
      setUser(user)
      setStatusMessage({ message:`${user.name} logged in`, type:'success' })
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setStatusMessage({ message:null, type:null })
      }, 5000)
    }catch{
      setStatusMessage({ message:'Wrong credentials', type:'error' })
      setTimeout(() => {
        setStatusMessage({ message:null, type:null })
      }, 5000)
    }
  }

  const blogForm = () => (
    <div>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      ) }
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={statusMessage?.message} type={statusMessage?.type} />
      { !user &&
        <Togglable buttonLabel="log in" >
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value) }
            handlePasswordChange={({ target }) => setPassword(target.value) }
            handleSubmit={ handleLogin }
          />
        </Togglable>
      }
      { user && (
        <div>
          <p>{user.name} logged in</p>
        </div>
      )}
      { user &&
        <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
      }
      { user && blogForm() }
    </div>
  )
}

export default App