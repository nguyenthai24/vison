const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userModel = new Schema({
    provider: {
        id: String,
        name: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,      
    },
    createAt: {
        type: Date,
        defualt: Date.now
    },
})


module.exports  = mongoose.model('user', userModel)