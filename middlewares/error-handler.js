const { logEvents } = require("./log-events");

const errorHandler = (error, req, res, next) => {
  logEvents(`${error.name} : ${error.message}`, "error-log.txt");
  console.log(error.stack);
  res.status(500).send(error.message);
};

module.exports = errorHandler;
