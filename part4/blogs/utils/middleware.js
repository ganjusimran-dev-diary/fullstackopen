const jwt = require("jsonwebtoken");

const User = require("../models/users");
const logger = require("../utils/logger");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const tokenExtractor = async (request, response, next) => {
  let authorizationToken = request.get("authorization");

  if (authorizationToken && authorizationToken.startsWith("Bearer ")) {
    authorizationToken = authorizationToken.replace("Bearer ", "");
  } else {
    return response.status(401).json({ error: "token invalid" });
  }

  const decodedToken = jwt.verify(authorizationToken, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = user;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "No routes matching this request" });
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  tokenExtractor,
};
