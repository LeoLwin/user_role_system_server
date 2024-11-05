const DB = require("../helper/database_helper");
const bcrypt = require("bcrypt");
const StatuCode = require("../helper/status_code_helper");

const create = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );
    const sql = `INSERT INTO Users (username,email,password) VALUE (?,?,?)`;
    const result = await DB.query(sql, [username, email, hashedPassword]);
    if (result.affectedRows == 1) {
      return StatuCode.OK(null);
    }
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  }
};

const list = async (page) => {
  try {
    const page_size = 10;
    const offset = (page - 1) * page_size;

    const countQuery = `SELECT COUNT(*) AS total FROM Users`;
    const countResult = await DB.query(countQuery);
    const total = countResult[0].total;
    console.log(total);

    const sql = `SELECT * FROM Users ORDER BY id DESC LIMIT ? OFFSET ?`;
    const result = await DB.query(sql, [page_size, offset]);
    console.log("List Result : ", result);
    if (result.length == 0) {
      return StatuCode.NOT_FOUND("No user found.");
    }
    return StatuCode.OK({ list: result, total });
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  }
};

const update = async (username, email, id) => {
  try {
    const sql = `UPDATE Users SET username = ? , email = ?`;
    const result = await DB.query(sql, [username, email]);
    if (result.affectedRows !== 1) {
      return StatuCode.ERROR("Not Updated!");
    }
    return StatuCode.OK(null, "User Data is Updated");
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  }
};

const deleteData = async (id) => {
  try {
    const sql = `DELETE FROM Users WHERE id = ?`;
    const result = await DB.query(sql, [id]);
    if (result.affectedRows !== 1) {
      return StatuCode.ERROR("Not Deleted!");
    }
    return StatuCode.OK(null, "User Data is deleted!");
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  }
};

const searchMail = async (email) => {
  try {
    const sql = `SELECT * FROM Users WHERE email = ?`;
    const result = await DB.query(sql, [email]);
    if (result.length == 0) {
      return StatuCode.NOT_FOUND("No user found.");
    }
    return StatuCode.OK(result[0]);
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  }
};

module.exports = {
  create,
  list,
  update,
  deleteData,
  searchMail,
};
