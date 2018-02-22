var mongoose = require('mongoose')

var CitaSchema = new mongoose.Schema({
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sesion' },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    date: { type: Date },
    created_at: { type: Date, default: Date.now },
    status: { type: Boolean, default: false }
})

module.exports = mongoose.model('Cita', CitaSchema)
