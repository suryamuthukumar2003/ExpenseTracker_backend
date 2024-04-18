const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    emailID: {
        type: String
    },
    password: {
        type: String
    },
    userName: {
        type: String
    }
}, {versionKey: false})

const User = mongoose.model('UserDetails', userDetailsSchema)

module.exports = { User }