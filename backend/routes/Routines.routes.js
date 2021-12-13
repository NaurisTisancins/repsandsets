const express = require('express');
const logger = require('../logger');
const router = express.Router();

const {
    createRoutine,
    readRoutines,
    addSession,
    deleteRoutine,
    updateRoutine,
} = require('../controllers/routines.controller');

router
    .post("/", createRoutine)
    .get("/:routineId?", readRoutines)
    .put("/:routineId", updateRoutine)
    .delete("/:routineId", deleteRoutine)
    .put("/sessions/:routineId", addSession)


module.exports = router;