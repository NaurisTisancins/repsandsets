const express = require('express');
const logger = require('../logger');
const router = express.Router();

const {
    createRoutine,
    readRoutines,
    readRoutine,
    addSession,
    deleteRoutine,
    updateRoutine,
} = require('../controllers/routines.controller');

router
    .post("/", createRoutine)
    .get("/", readRoutines)
    .get("/:id", readRoutine)
    .patch("/:id", updateRoutine)
    .delete("/:id", deleteRoutine)
    .put("/sessions/:id", addSession)


module.exports = router;