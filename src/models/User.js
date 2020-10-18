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
    joined: {
        type: Date,
        default: Date.now
    },
    language: {
        type: String,
        required: true
    },
    notifications: {
        type: Boolean,
        default: true
    },
    lastTimeUsed: {
        type: Number,
        default: new Date().getTime()
    },
    trivia: {
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        used: { type: Number, default: 0}
    },
    vanilla: {
        maxScore: { type: Number, default: 0 },
        used: { type: Number, default: 0 }
    },
    time: {
        maxScore: { type: Number, default: 0 },
        used: { type: Number, default: 0 }
    }
})

module.exports = mongoose.model('User', userSchema)