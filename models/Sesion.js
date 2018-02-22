var mongoose = require('mongoose')
var Cita = require('./Cita.js')
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

var SesionSchema = new mongoose.Schema({
    name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    time_intervals: [{from: Date, to: Date}],
    duration: Number,
    status: { type: Boolean, default: true},
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    created_at: { type: Date, default: Date.now }
})


SesionSchema.statics.findAvailable = function(){
    const self = this

    var promise = this.find({
        status: true,
        end_date: { $gte: Date.now()}
    })
    .then((sessions) => {

        const ss = sessions.map(sess => ({
            time_intervals: sess.time_intervals,
            name: sess.name,
            minDate: sess.start_date,
            maxDate: sess.end_date,
            disabledDates: []
        }))

        return ss
    })

    return promise
}

SesionSchema.statics.createWithCitas = function(data){
    return this.create(data)
        .then((session) => {
            const range = moment.range(session.start_date, session.end_date);
            const days = Array.from(range.by('days'));
            // add each schedule according to time intervals
            const citas = days.map((day) => ({
                session_id: session.id,
                date: day.toDate()
            }))
            return Cita.create(citas).then((citas) => {
                console.log("citas creadas")
                return session
            }).catch((err) => console.log(err))
        })
}

module.exports = mongoose.model('Sesion', SesionSchema)
