const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
const User = require('../models/user')
const helper = require('./test_helper')
// const jwt = require('jsonwebtoken')

const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await helper.createUserAndToken()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, 1)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')
    const usernames = response.body.map((r) => r.username)
    assert(usernames.includes('root'))
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'singleUser',
      name: 'Single User',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('login', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await helper.createUserAndToken()
  })

  test('user is able to log in', async () => {
    const user = {
      username: 'root',
      password: 'sekret',
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(response.body.token)
    assert.strictEqual(response.body.username, 'root')
    assert.strictEqual(response.body.name, '')
  })

  test('login fails with wrong password', async () => {
    const user = {
      username: 'root',
      password: 'wrongpassword',
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('invalid username or password'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
