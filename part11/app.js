const express = require('express')
const path = require('path')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
  // // eslint-disable-next-line no-constant-condition
  // if (true) throw('error...  ')
  res.send('ok')
})

const start = async () => {
  await app.listen(PORT)
  console.log(`server started on port ${PORT}`)
}

start()
