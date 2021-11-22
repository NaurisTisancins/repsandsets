const express = require('express');
const logger = require('./../logger');
const router = express.Router();

const {
  addSession,
} = require("../controllers/session.controller");



router.post("/:id", addSession)

module.exports = router;