const jwt = require("jsonwebtoken");
const user = require("../models/User");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  // check for header for authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the jobs route
    req.user = { userId: payload.userId, name: payload.name };
  } catch (error) {
    throw new UnautheniticatedError("Authentication Invalid");
  }
};


module.exports = auth