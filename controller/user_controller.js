const router = require("express").Router();
const StatusCode = require("../helper/status_code_helper");
const User = require("../models/user_model");
const { validationToken } = require("../middleware/validationToken");

router.post("/create", validationToken, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await User.create(username, email, password);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.get("/list/:page", validationToken, async (req, res) => {
  try {
    const { page } = req.params;
    const result = await User.list(page);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.put("/update/:id", validationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const result = await User.update(username, email, id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.delete("/delete/:id", validationToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.deleteData(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});


module.exports = router;
