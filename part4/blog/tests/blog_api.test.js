const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

const app = require('../app')
const User = require('../models/user')
const api = supertest(app)



describe('Tests for the Blog model', () => {
  let token
  let rootUser


  beforeEach(async () => {
    await Blog.deleteMany({})
    // await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const newUser = await helper.createUserAndToken()
    rootUser = newUser.user
    token = newUser.token

    // console.log('token', token)
    console.log('rootUser', rootUser._id.toString())
    const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: rootUser._id.toString() }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

  })

  describe('using the get routes', () => {

    test('all blogs are returned and formatted as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })

    test('the identifier of all posts is called id', async () => {
      const blogs = await helper.blogsInDb()
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        // assert(blogs.every(blog => 'id' in blog))
      assert(blogs.every(blog => Object.hasOwn(blog, 'id')))

    })
  })

  describe('using the post route', () => {
    test('blog is saved successfully using post route', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Myself',
        url: 'http://something.com',
        likes: 5,
        user: rootUser._id
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      // console.log(blogs)
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
      const currentBlog = blogs[blogs.length - 1]
      const { id, ...withoutId } = currentBlog // eslint-disable-line no-unused-vars
      assert.deepStrictEqual(newBlog, withoutId)

    })

    test('if likes is missing, default to 0', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Myself',
        url: 'http://something.com'
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      const currentBlog = blogs[blogs.length - 1]
      assert.strictEqual(currentBlog.likes, 0)
    })

    test('if title or url is missing, return 400', async () => {
      const newBlog = {
        author: 'Myself',
        likes: 5
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('using the delete route', () => {
    test('deleting a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(blog => blog.id)
      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
  })

  describe('using the put route', () => {
    test('updating a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...blogToUpdate, likes: 100 })
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      assert.strictEqual(updatedBlog.likes, 100)
    })


  })
})

after(async () => {
  await mongoose.connection.close()
})
