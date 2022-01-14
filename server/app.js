require("dotenv").config();
const express = require("express");
const app = express();
const { } = process.env;

require("./middleware/middleware.js")(app);
require("./database");
require("./routes")(app);

module.exports = app;
