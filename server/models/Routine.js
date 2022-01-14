const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Session = require("./Session");
const SessionPlan = require("./SessionPlan").schema;

//Routine Schema
const routineSchema = new Schema({
  //userID
  name: {
    type: String,
    required: [true, "Please select a name for your routine"],
  },
  units: {
    type: String,
    required: [true, "Please select: 'kg' or 'lbs'"],
    enum: {
      values: ["kg", "lbs"],
      message: "Units of measuring resistance are either: 'kg' or 'lbs'",
    }
  },
  sessionPlan: [SessionPlan],
  sessionLog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    }
  ],
});

const Routine = mongoose.model('Routine', routineSchema);
module.exports = Routine;

