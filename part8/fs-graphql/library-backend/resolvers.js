const { GraphQLError } = require("graphql/error")
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')


const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let authorId = null
            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    return []
                }
                authorId = author._id
            }

            const query = {}
            if (authorId) {
                query.author = authorId
            }
            if (args.genre) {
                query.genres = { $in: [args.genre] }
            }

            return Book.find(query).populate('author')
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Author: {
        bookCount: async ({ _id }) => Book.countDocuments({ author: _id }).exec(),
    },
    Mutation:{
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                })
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author })
                await author.save()
            }

            const book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres,
                author: author._id,
            })

            try {
                await book.save()
                await book.populate('author')
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                })
            }
            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                })
            }


            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }

            author.born = Number(args.setBornTo)
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
                .catch(error => {
                    throw new GraphQLError(error.message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error,
                        },
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const jwtSecret = process.env.JWT_SECRET
            if (!jwtSecret) {
                throw new GraphQLError('JWT secret is not configured', {
                    extensions: {
                        code: 'INTERNAL_SERVER_ERROR',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, jwtSecret) }
        },
        _resetDatabase: async () => {
            if (process.env.NODE_ENV !== 'test') {
                throw new GraphQLError('_resetDatabase is only available in test mode')
            }

            await Book.deleteMany({})
            await Author.deleteMany({})
            await User.deleteMany({})

            return true
        },

        
    }
}

module.exports = resolvers;