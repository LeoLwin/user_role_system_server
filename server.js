require("dotenv").config();
const express = require("express");
const cors = require("cors");
const index_controller = require("./controller/index_controller");
const router = express.Router();
PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("hello");
});
app.use("/", index_controller);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
