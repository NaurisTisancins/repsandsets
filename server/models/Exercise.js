const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
  name: {
    type: String,
    required: [true, "Exercise must have a name!"],
  },
  bodyPart: {
    type: String,
    required: [true, "Please specify which body part this exercise targets!"],
  },
  resistanceType: {
    type: String,
    required: [true, "Please specify a resistance type"],
    enum: ["free weights", "machine", "calisthenics"],
  },
  

});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;