const mongoose = require('mongoose')
require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8'])

const schema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [{ type: String }]
})

module.exports = mongoose.model('Book', schema)