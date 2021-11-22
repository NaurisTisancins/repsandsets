const Routine = require('../models/workout-routine/workoutRoutine.model');
const { errorHandler } = require('../utils/utils');
const logger = require('./../logger');

exports.createRoutine = function (req, res) {
  const routineData = req.body;
  console.log("Routine DATA", routineData)
  logger.info(`RoutineData ${routineData}`);
  const newRoutine = new Routine(routineData);
  newRoutine.save((err, routine) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(routine);
  });
};//createRoutine

exports.readRoutines = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id
  };
  Routine.find(query).exec((err, routines) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && routines.length === 0) {
      return res.status(404).send({ message: "No Routines found with that id" });
    }
    return res.status(200).json(routines);
  })
};//readRoutines


