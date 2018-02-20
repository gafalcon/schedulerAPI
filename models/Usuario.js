var mongoose = require('mongoose')

var UsuarioSchema = new mongoose.Schema({
    username: String,
    role: {
        type: [{
            type: String,
            enum: ['estudiante', 'admin', 'profesor']
        }],
        default: ['estudiante']
    }
})

UsuarioSchema.statics.findOneOrCreate = function(condition, doc){
    const self = this

    var promise =  this.findOne(condition)
        .then((result) => {
            return (result) ? result : self.create(condition)
        })

    return promise
}

module.exports = mongoose.model('Usuario', UsuarioSchema)
