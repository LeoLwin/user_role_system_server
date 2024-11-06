const router = require("express").Router();
const { connect } = require("../helper/database_helper");
const StatusCode = require("../helper/status_code_helper");
const Role = require("../models/roles_model");

router.post("/create", async (req, res) => {
  try {
    const { role_name, description } = req.body;
    const result = await Role.create(role_name, description);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.get("/list/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const result = await Role.list(page);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, description } = req.body;
    const result = await Role.update(role_name, description, id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Role.deleteData(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.json(StatusCode.ERROR(error.message));
  }
});

module.exports = router;
