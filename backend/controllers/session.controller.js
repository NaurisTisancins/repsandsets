const Routine = require('../models/workout-routine/workoutRoutine.model');
const Session = require('../models/workout-routine/session.model');
const { errorHandler } = require('../utils/utils');
const logger = require('./../logger');


exports.addSession = function (req, res) {
  const sessionData = req.body;
  const query = {};

  query._id = req.params.id;

  console.log("sessionData", sessionData);
  Routine.findOne(query).exec((err, routine) => {
    if (err) return errorHandler(res, err);
    const newSession = new Session(sessionData);
    newSession.save((err, session) => {
      if (err) return errorHandler(res, err);
      console.log(session);
    });
    routine.sessions.push(newSession);
    routine.save((err, routine) => {
      if (err) return errorHandler(res, err);
      return res.status(201).json(routine);
    })
  })
};//addSession