const path = require('path');

const {
  NODE_ENV = 'development'
} = process.env;

module.exports = function (app) {
  const API_ENDPOINT = "/api";
  const API_VERSION = "v1";

  app.use(`${API_ENDPOINT}/${API_VERSION}/routines`, require("./Routines.routes"));

  //if dev = send 404 if prod send index.js static file from client
  app.get("*", (req, res) => {
    if (req.xhr) {
      return res.sendStatus(404);
    }
    if (NODE_ENV === "production") {
      res.sendFile(path.join(__dirname, "../../client/", "build/index.html"));
    }
    if (NODE_ENV === "development") {
      res.sendFile(path.join(__dirname, "../../client/", "public/index.html"));
    }
  });//404 vs static files

  app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/", "public/index.html"));
  });//handle non existend routes in gen
};