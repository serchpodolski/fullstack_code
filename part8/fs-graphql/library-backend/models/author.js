const mongoose = require('mongoose')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    born: {
        type: Number,
    },
})

module.exports = mongoose.model('Author', schema)