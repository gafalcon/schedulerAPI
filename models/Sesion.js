var mongoose = require('mongoose')

var SesionSchema = new mongoose.Schema({
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    start_time: String,
    end_time: String,
    duration: Number,
    status: Boolean,
    created_by: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Sesion', SesionSchema)
