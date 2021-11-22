const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//session Schema
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

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;