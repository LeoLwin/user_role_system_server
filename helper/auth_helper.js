const StatusCode = require("../helper/status_code_helper");
const jwt = require("jsonwebtoken");
const config = require("../config/dbConfig");

const getToken = async (id, name, email) => {
  try {
    const accessToken = jwt.sign(
      {
        user: {
          name: name,
          email: email,
          id: id,
        },
      },
      config.JWT_SECRET,
      { expiresIn: "9h" }
    );
    return StatusCode.OK(accessToken);
  } catch (error) {
    console.log(error);
    return StatusCode.ERROR(error.message);
  }
};

module.exports = { getToken };
