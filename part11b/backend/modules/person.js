const mongoose = require('mongoose')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // must be at least 9 characters, and match "XX-..." or "XXX-..."
        // where first part is 2 or 3 digits and second part is digits only
        if (typeof v !== 'string') return false
        if (v.length < 9) return false
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

// const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
