import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/UsersList'
import ErrorBoundary from './ErrorBoundary'
import BlogList from './pages/BlogList'
import Menu from './components/Menu'
import Home from './pages/Home'
import { useSetNotification, useClearNotification } from '../stores/notificationStore'
import { useBlogs, useBlogActions } from '../stores/blogStore'
import { useUser, useUserActions } from '../stores/usersStore'
import User from './pages/User'

const App = () => {
  const blogFormRef = useRef()
  const [is404, setIs404] = useState(false)
  const setNotification = useSetNotification()
  const clearNotification = useClearNotification()
  const { initialize, createBlog } = useBlogActions()
  const blogs = useBlogs()
  const loggedUser = useUser()
  const { login, logout, initialize: initializeUser } = useUserActions()

  useEffect(() => {
    initializeUser(),
    initialize()
  }, [initialize,initializeUser])


  // useEffect(() => {
  //   const validPaths = ['/', '/blogs', '/login']
  //   if (!validPaths.includes(window.location.pathname)) {
  //     setIs404(true)
  //   }
  // }, [])

  // if (is404) {
  //   return (
  //     <div
  //       style={{
  //         padding: '20px',
  //         backgroundColor: '#fdd',
  //         color: '#900',
  //         border: '1px solid #900',
  //       }}
  //     >
  //       <h2>404 - Page Not Found</h2>
  //       <p>The page you are looking for does not exist.</p>
  //       <button onClick={() => (window.location.href = '/')}>Go Home</button>
  //     </div>
  //   )
  // }

  return (
    <div>
      <ErrorBoundary> 
        <Menu />
        <Notification />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList user={loggedUser} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/blogform" element={ loggedUser ? <BlogForm /> : <LoginForm /> } />
            <Route path="/users/:id" element={<User />} />
            <Route path="*" element={
              <div style={{ padding: '20px', backgroundColor: '#fdd', color: '#900', border: '1px solid #900' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <button onClick={() => (window.location.href = '/')}>Go Home</button>
              </div>
              } />
          </Routes>
      </ErrorBoundary>
    </div>

  )
}

export default App
