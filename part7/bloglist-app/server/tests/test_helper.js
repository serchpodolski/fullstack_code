const Blog = require('../models/blog')
const User = require('../models/user')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

const createUserAndToken = async ({
  username = 'root',
  name = '',
  password = 'sekret',
} = {}) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  return { user: savedUser, token }
}

module.exports = { initialBlogs, blogsInDb, usersInDb, createUserAndToken }
