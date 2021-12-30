const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameModel = new Schema({
    name: {
        type: String
    },
    imgSmall: {
        type: String
    },
    imgBig: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    },
    desc: {
        type: String
    },
    featured: {
        type: Boolean,
        default : false
    },
    position : {
        type : Number,
        enum : [1,2,3],
        default : null
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Games', gameModel)