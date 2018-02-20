var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username: String,
    role: {
        type: [{
            type: String,
            enum: ['estudiante', 'admin', 'profesor']
        }],
        default: ['estudiante']
    }
})

module.exports = mongoose.model('User', UserSchema)
