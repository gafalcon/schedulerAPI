var mongoose = require('mongoose')

var CitaSchema = new mongoose.Schema({
    session_id: { type: Schema.Types.ObjectId, ref: 'Sesion' },
    student_id: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    date: { type: Date },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Cita', CitaSchema)
