const router = require("express").Router();
const user = require("./user_controller");
const auth = require("./auth_controller");
const role = require("./roles_controller");

router.use("/user", user);
router.use("/auth", auth);
router.use("/role", role);

module.exports = router;
