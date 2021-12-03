const express = require('express');
const logger = require('../logger');
const router = express.Router();

const {
  createRoutine,
  readRoutines,
  addSession,
  deleteRoutine,
} = require('../controllers/routines.controller');

router
  .post("/", createRoutine)
  .get("/:routineId?", readRoutines)
  .put("/session/:routineId", addSession)
  .delete("/:routineId", deleteRoutine)
  

module.exports = router;