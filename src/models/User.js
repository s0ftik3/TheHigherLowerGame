const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    correct_answers: {
        type: Number,
        default: 0
    },
    wrong_answers: {
        type: Number,
        default: 0
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)