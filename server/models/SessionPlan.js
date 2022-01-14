const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionPlanSchema = new Schema({
  sessionFocus: {
    type: String,
    enum: {
      values: ["Intensity", "Volume", "Endurance"],
      message: "Sessions can be focused, for example: 'Intensity', 'Volume', 'Endurance'",
    }
  },
  selectedExercises: [
    {
      exercise: {
        type: String,
        required: [true, "You must select an exercise!"]
      },
      repRange: {
        min: {
          type: Number, min: 1,
          validate: {
            validator: function (val) {
              const currMax = this.repRange.max;
              return (currMax !== undefined ? val <= currMax : true);
            },
            message: "The MIN range with value {VALUE} must be <= than the max range!"
          }
        },
        max: {
          type: Number, min: 1,
          validate: {
            validator: function (val) {
              const currMin = this.repRange.min;
              return (currMin !== undefined ? val >= currMin : true);
            },
            message: "The MAX range with value {VALUE} must be >= than the min range!"
          }
        },
      }
    }
  ],
});

const SessionPlan = mongoose.model("SessionPlan", sessionPlanSchema);
module.exports = SessionPlan;