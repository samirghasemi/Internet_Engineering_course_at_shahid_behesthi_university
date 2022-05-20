const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

extractToken=(req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

verifyToken = (req, res, next) => {
  let token = extractToken(req);
  if (!token) {
    console.log("token has problem")
    return res.status(400).send({error: {message: "Bad request!"}});
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log("token has problem")
      return res.status(400).send({error: {message: "Bad request!"}});
    }
    req.userId = decoded.userId;
    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;
