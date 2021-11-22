const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Routine Schema
const RoutineSchema = new Schema({
  //userID
  routineName: {
    type: String,
    required: true,
  },
  movements: [{
    name: {
      type: String,
    }
  }],
  sessions: [{
    type: mongoose.ObjectId,
    ref: 'Session',
  }]
});

const Routine = mongoose.model('Routine', RoutineSchema);
module.exports = Routine;

