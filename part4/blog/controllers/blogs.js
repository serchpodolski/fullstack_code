const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if(!decodedToken.id){
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)

  // if(!user){
  //   return response.status(400).json({ error: 'UserId missing or not valid' })
  // }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { author, title, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const isEditingContent = (author && author !== blog.author) ||
                           (title && title !== blog.title) ||
                           (url && url !== blog.url)

  if (isEditingContent && request.user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'only the creator can edit text fields' })
  }

  blog.author = author
  blog.title = title
  blog.url = url
  blog.likes = likes

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { name: 1 })
  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const currentBlog = await Blog.findById(request.params.id)

  if (!currentBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (request.user.id.toString() !== currentBlog.user.toString()) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter
