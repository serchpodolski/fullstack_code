import { Link } from 'react-router-dom'
import { useUser, useUserActions } from '../../stores/usersStore'
import '../styles/menuStyles.css'
import blogapp from '../assets/blogapp.png'

const Menu = () => {
  const loggedUser = useUser()
  const { logout } = useUserActions()

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  if (!loggedUser) {
    return (
      <div className='menu-wrapper'>
        <div className='menu-header'>
          <Link to="/">
            <img src={blogapp} alt="Blog Tracker App" className="menu-logo" />
          </Link>
        </div>
        <div className='menu-links'>
          <Link to="/login">LOGIN</Link>
        </div>
      </div>
    )
  }


  return (
    <div className='menu-wrapper'>
      <div className='menu-header'>
        <Link to="/">
          <img src={blogapp} alt="Blog Tracker App" className="menu-logo" />
        </Link>
      </div>
      <div className='menu-links'>
        <Link to="/">HOME</Link>
        <Link to="/blogs">BLOGS</Link>
        <Link to="/users">USERS</Link>
        <Link to="/blogform">NEW BLOG</Link>
        {loggedUser && (
          <a href="#" onClick={handleLogout} >
            LOGOUT
          </a>
        )}
      </div>
    </div>
  )
}

export default Menu;