const jwt = require("jsonwebtoken");
const StatusCode = require("../helper/status_code_helper");
const config = require("../config/dbConfig");

const validationToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      await jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          res.json(StatusCode.UNAUTHENTICATED("User is not authorized!"));
          return;
        }
        res.locals.user = decoded.user;
        next();
      });
    } else {
      console.log("No Token");
      res.json(
        StatusCode.UNAUTHENTICATED(
          "User is not authorized or token is missing!"
        )
      );
      return;
    }
  } catch (err) {
    return res.json(new StatusCode.ERROR(err.message));
  }
};

module.exports = {validationToken};
