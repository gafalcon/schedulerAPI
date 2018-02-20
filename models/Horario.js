var mongoose = require('mongoose')

var HorarioSchema = new mongoose.Schema({
    date: Date,
    hour: Date,
    status: Boolean,
    session_id: { type: Schema.Types.ObjectId, ref: 'Sesion' },
})

module.exports = mongoose.model('Horario', HorarioSchema)
