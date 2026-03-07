const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? null : blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

// returns an object describing the author with the most blog entries
// in the format { author: 'name', blogs: count }
// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) {
//     return null
//   }

//   const counts = blogs.reduce((acc, { author }) => {
//     acc[author] = (acc[author] || 0) + 1
//     return acc
//   }, {})

//   let topAuthor = null
//   let max = 0
//   for (const [author, cnt] of Object.entries(counts)) {
//     if (cnt > max) {
//       max = cnt
//       topAuthor = author
//     }
//   }

//   return { author: topAuthor, blogs: max }
// }

// Implementation using lodash
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // use lodash to count entries per author and pick the highest
  const best = _.chain(blogs)
    .countBy('author')
    .map((count, author) => ({ author, blogs: count }))
    .maxBy('blogs')
    .value()

  return best
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // group posts by author, compute total likes each, and pick the highest
  const best = _.chain(blogs)
    .groupBy('author')
    .map((posts, author) => ({ author, likes: _.sumBy(posts, 'likes') }))
    .maxBy('likes')
    .value()

  return best
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
