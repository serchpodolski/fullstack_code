const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"])
const app = express()
app.use(express.json())
app.use(morgan('tiny'));
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let phones = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getInfo = () =>{
    const date = new Date();
    return `<p>Phonebook has info for ${phones.length} people</p>
            <p>${date}</p>`
}

app.get('/info', (request, response) => {
  response.send(getInfo())
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phones.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phones = phones.filter(person => person.id !== id)
    response.status(204).end()
})


app.get('/api/persons', (request, response) => {
    response.json(phones)
})

const generateId = () => {
    const randomId = Math.random()*10000000000000
    return String(Math.round(randomId))
  }


app.post('/api/persons', (request, response) => {
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
    if(phones.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    phones = phones.concat(person)
    response.json(person)
}
)

const PORT = process.env.PORT || 3002
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
// console.log(`Server running on port ${PORT}`)