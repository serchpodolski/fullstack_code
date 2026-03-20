const LoginForm = ({ handleSubmit, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>

    </div>
  )
}

export default LoginForm