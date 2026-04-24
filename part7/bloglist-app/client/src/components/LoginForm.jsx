import { useState } from 'react'
import { useSetNotification, useClearNotification } from '../../stores/notificationStore'
import { useUserActions } from '../../stores/usersStore'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'
import '../styles/loginStyles.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const { reset: resetUsername, ...usernameField } = useField('text')
  const { reset: resetPassword, ...passwordField } = useField('password')
  const setNotification = useSetNotification()
  const clearNotification = useClearNotification()
  const { login } = useUserActions()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', usernameField.value, passwordField.value)
    try {
      const user = await login({ 
            username: usernameField.value, 
            password: passwordField.value
          })
      setNotification(`${user.name} logged in`, 'success')
      resetPassword()
      resetUsername()
      setTimeout(() => clearNotification(), 5000)
      navigate('/blogs')

    } catch {
      setNotification('Wrong credentials', 'error')
      setTimeout(() => clearNotification(), 5000)
    }
  }


  return (
    <div className='login-form'>
      <h2>Login</h2>
      <p>Enter your credentials to start using the app.</p>
      <form onSubmit={handleLogin} className='login-fields-container'>
        <div className='login-field'>
          <label>
            username
            <input {...usernameField} />
          </label>
        </div>
        <div className='login-field'>
          <label>
            password
            <input {...passwordField} />
          </label>
        </div>
        <div className='login-button'>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
