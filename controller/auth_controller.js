const router = require("express").Router();
const Users = require("../models/user_model");
const bcrypt = require("bcrypt");
const StatusCode = require("../helper/status_code_helper");
const Auth_helper = require("../helper/auth_helper");

router.post("/login",  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.searchMail(email);
    console.log(user);
    console.log("user.code != 200 : ", user.code != "200");
    if (user.code != "200") {
      return res.json(user);
    }

    if (await bcrypt.compareSync(password, user.data.password)) {
      const getToken = await Auth_helper.getToken(
        user.data.id,
        user.data.username,
        user.data.email
      );
      console.log("getToken : ", getToken);
      return res.json(getToken);
    }
    return res.json(StatusCode.ERROR("Password is incorrect"));
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

module.exports = router;
