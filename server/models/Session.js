const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
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

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;