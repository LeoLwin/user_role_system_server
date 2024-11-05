const router = require("express").Router();
const user = require("./user_controller");
const auth = require("./auth_controller");
router.use("/user", user);
router.use("/auth", auth);

module.exports = router;
