const express = require('express');
const logger = require('../logger');
const router = express.Router();

//todo - create controller functs to add routines
const {
  createRoutine,
  readRoutines,
} = require('../controllers/routines.controller');

router
  .post("/", createRoutine)
  .get("/:id?", readRoutines)
  

module.exports = router;