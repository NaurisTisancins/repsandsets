const Routine = require('../models/workout-routine/workoutRoutine.model');
// const Session = require('../models/workout-routine/session.model');
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
  if (req.params.routineId) {
    query._id = req.params.routineId;
  };
  Routine.find(query).exec((err, routines) => {
      if (err) return errorHandler(res, err);
      
    return res.status(200).json(routines);
  });
};//readRoutines

exports.deleteRoutine = function (req, res) {
  let { routineId } = req.params;
  Routine.deleteOne({ _id: routineId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (routineId && report.deletedCount === 0) {
      return res.status(404).send({ message: `No routine found with id: ${routineId}` });
    }
    res.sendStatus(204);
  });
};//deleteRoutine

exports.updateRoutine = function (req, res) {
  const updates = req.body;
  console.log(updates)
  let { routineId } = req.params;
  Routine.updateOne({_id: routineId}, req.body, function(err, result) {
    if(err) return errorHandler(res, err);
    logger.info(`result ${result}`);
    if(result.nModified ===0) {
      return res.status(404).send({message: `No Routines found with id: ${routineId}`});
      res.sendStatus(200);
    }
  })
};//updateRoutine

exports.addSession = function (req, res) {
  const sessionData = req.body;
  let { routineId } = req.params;
  Routine.findOneAndUpdate({ _id: routineId, sessionData }).exec((err, routine) => {
    if (err) return errorHandler(res, err);
    routine.sessions.push(sessionData);
    routine.save();
    console.log(routine);
    return res.status(201).json(routine);
  });
};//addSession



