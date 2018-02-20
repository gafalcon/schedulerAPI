var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username: String,
    type: {
        type: [{
            type: String,
            enum: ['estudiante', 'admin', 'profesor']
        }],
        default: ['estudiante']
    }
})

module.exports = mongoose.model('User', UserSchema)
