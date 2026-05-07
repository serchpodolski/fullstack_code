const { ApolloServer } = require("@apollo/server")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/use/ws")
const { expressMiddleware } = require("@as-integrations/express5")
const cors = require("cors")
const express = require("express")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const http = require("http")
const { startStandaloneServer } = require("@apollo/server/standalone")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const jwt = require("jsonwebtoken")
const User = require("./models/user")

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null
  }

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return User.findById(decodedToken.id)
}


const startServer = async (port) => {
  app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)


  const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      }
    
    ],
  })

  // startStandaloneServer(server, {
  //   listen: { port },
  //   context: async ({ req }) => {
  //     const auth = req.headers.authorization
  //     const currentUser = await getUserFromAuthHeader(auth)
  //     return { currentUser }
  //   },
  // }).then(({ url }) => {
  //   console.log(`Server ready at ${url}`)
  // })
  await server.start()
  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization
        const currentUser = await getUserFromAuthHeader(auth)
        return { currentUser }
      },
    })
  )

  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`)
  })
  

}

module.exports = startServer;