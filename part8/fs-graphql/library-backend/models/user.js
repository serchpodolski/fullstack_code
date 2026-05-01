const mongoose = require('mongoose')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])

const schema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', schema)