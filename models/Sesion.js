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

    console.log("create with citas")
    return this.create(data)
        .then((session) => {
            const range = moment.range(session.start_date, session.end_date);
            const days = Array.from(range.by('days')).filter((day) => {
                const d = day.day()
                return !(d === 0 || d === 6)
            } );

            const timeranges = session.time_intervals.map((t_interval) => moment.range(t_interval.from, t_interval.to))
            const arrays = timeranges.map((trange) => Array.from(trange.by('minutes', {step: session.duration}))).reduce((a,b) => a.concat(b), [])

            const citas = days.map((day) => {
                return arrays.map((time) => {
                    const date = day.set({'minute': time.get('minute'), second: time.get('second'), hour: time.get('hour')})
                    return {
                        session_id: session.id,
                        date: date.toDate()
                    }
                })
            }).reduce((a,b) => a.concat(b), [])


            return Cita.create(citas).then((citas) => {
                console.log("citas creadas")
                return session
            }).catch((err) => console.log(err))
        })
}

module.exports = mongoose.model('Sesion', SesionSchema)
