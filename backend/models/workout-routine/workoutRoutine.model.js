const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    session: [{
        movement: {
            type: String,
            require: true,
        },
        sets: [{
            set: {
                type: Number,
            },
            reps: {
                type: Number,
            }
        }]
    }]
}, {
    timestamps: true,
});

//Routine Schema
const RoutineSchema = new Schema({
    //userID
    routineName: {
        type: String,
        required: true,
    },
    movements: [{
        name: String
    }],
    sessions: [SessionSchema]
});

const Routine = mongoose.model('Routine', RoutineSchema);
module.exports = Routine;

