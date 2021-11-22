const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const logger = require("../logger");

const {
  NODE_ENV = 'development'
} = process.env;

module.exports = function (app) {
  if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client", "build")));
    app.use(compression());
  };

  app.use(express.urlencoded({ extended: false }));

  app.use(express.json());

  app.use(helmet());

  app.use(cors());

  const myStream = {
    write: (text) => {
      logger.info(text)
    }
  };
  //use logger stream inside morgan to format and save http logs in a file
  app.use(morgan('combined', { stream: myStream }));
};

