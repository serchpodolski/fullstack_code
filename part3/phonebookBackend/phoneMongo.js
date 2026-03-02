const mongoose = require('mongoose')
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]
const url = `mongodb+srv://fstack:${password}@cluster0.ibr8swm.mongodb.net/test`

const name = process.argv[3]
const number = process.argv[4]


const createConnection = () => {
  mongoose.set('strictQuery',false)
  mongoose.connect(url, { family: 4 })
}


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const savePhone = (nameArg, numberArg) =>{
  if(!nameArg || !numberArg){
    return
  }
  const person = new Person({
      name: nameArg,
      number: numberArg
  })
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

const loadPhones = () =>{
  Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person.name)
    console.log(person.number)
  })
  mongoose.connection.close()
  })
}

createConnection()
if(process.argv.length == 3){
  loadPhones()
}else{
  savePhone(name, number)
}
// loadPhones()
// savePhone("William Wallace", "123-23-123")



