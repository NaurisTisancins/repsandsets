const Routine = require('../models/Routine');
// const Session = require('../models/workout-routine/session.model');
const { errorHandler } = require('../utils/utils');
const logger = require('../logger');

exports.createRoutine = async (req, res) => {
  try {
    logger.info(`RoutineData ${JSON.stringify(req.body)}`);
    const newRoutine = await Routine.create(req.body);
    res.status(201).json(newRoutine);
  } catch (err) {
    console.log("createRoutine", err.message);
    errorHandler(res, err, 400)
  }
};//createRoutine

exports.readRoutines = async (req, res) => {
  try {
    //query - so im able to implement query string parameters for filtering
    let query = { ...req.query };
    const routines = await Routine.find(query);
    res.status(200).json(routines);
  } catch (err) {
    console.log("readRoutines", err.message);
    errorHandler(res, err, 404);

  }

};//readRoutines

exports.readRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    res.status(200).json(routine);
  } catch (err) {
    console.log("readRoutine by id", err.message);
    errorHandler(res, err, 404);
  }
};//readRoutine

exports.deleteRoutine = async (req, res) => {
  try {
    await Routine.deleteOne({ _id: req.params.id });
    res.status(204).json({
      "status": "success",
      "message": `Routine with id: ${req.params.id} deleted!`
    });
  } catch (err) {
    console.log("deleteRoutine", err.message);
    errorHandler(req, err, 404);
  }
};//deleteRoutine

exports.updateRoutine = async (req, res) => {
  try {
    const routine = await Routine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(routine);
  } catch (err) {
    console.log("updateRoutine", err.message);
    errorHandler(req, err, 404);
  }
};//updateRoutine

exports.addSession = function (req, res) {
  const sessionData = req.body;
  let { id } = req.params;
  Routine.findOneAndUpdate({ _id: id, sessionData }).exec((err, routine) => {
    if (err) return errorHandler(res, err);
    routine.sessions.push(sessionData);
    routine.save();
    console.log(routine);
    return res.status(201).json(routine);
  });
};//addSession



