const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./modules/person')

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Updated the getInfo method as an async function to guarantee there is information back from the DB when calculating the total entries
const getInfo = async () => {
  const date = new Date()
  // use countDocuments for efficiency (no need to retrieve all records)
  const totalPeople = await Person.countDocuments({})

  return `<p>Phonebook has info for ${totalPeople} people</p>
          <p>${date}</p>`
}

// Added middleware error detection to all routes
app.get('/info', async (request, response, next) => {
  try {
    const info = await getInfo()
    response.send(info)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})


app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
    .catch(error => next(error))
}
)

// Using findById instead of findByAndUpdate to make use of mongoose validations
app.put('/api/persons/:id', (request, response, next) => {
  const { content, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        person.content = content
        person.number = number

        person.save()
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
// console.log(`Server running on port ${PORT}`)