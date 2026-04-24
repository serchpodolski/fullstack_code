import { useState, useEffect } from 'react'
import userService from '../services/userInfo'
import { Link } from 'react-router-dom'
import '../styles/userStyles.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAll()
        setUsers(usersData)
      } catch (error) {
        console.error('Failed to load users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="user-ctn">
      <h2>Users</h2>
      <table>
        <thead className="table-header-bar">
          <tr >
            <th>Name</th>
            <th>Username</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.username}</td>
              <td>{user.blogs?.length ?? 0} blogs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users