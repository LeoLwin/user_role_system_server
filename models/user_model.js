const DB = require("../helper/database_helper");
const bcrypt = require("bcrypt");
const StatuCode = require("../helper/status_code_helper");

const create = async (username, email, password) => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await DB.getConnection();

    const hashedPassword = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );
    const sql = `INSERT INTO Users (username, email, password) VALUES (?, ?, ?)`;

    const [result] = await connection.execute(sql, [
      username,
      email,
      hashedPassword,
    ]);

    if (result.affectedRows === 1) {
      await connection.commit();
      return StatuCode.OK(null, "User created successfully");
    } else {
      await connection.rollback();
      return StatuCode.ERROR("User creation failed");
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatuCode.ERROR(error.message);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      await connection.release();
    }
  }
};

const list = async (page) => {
  let connection;
  try {
    const page_size = 10;
    const offset = (page - 1) * page_size;

    connection = await DB.getConnection();

    await connection.beginTransaction();

    // Count query
    const countQuery = `SELECT COUNT(*) AS total FROM Users`;
    const [countResult] = await connection.query(countQuery);
    const total = countResult[0].total;
    console.log(total);

    // Select query
    const sql = `SELECT id, username, email, created_at FROM Users ORDER BY id DESC LIMIT ? OFFSET ?`;
    const [result] = await connection.query(sql, [page_size, offset]);
    console.log("List Result: ", result);

    // Commit transaction after both queries are successful
    await connection.commit();

    if (result.length == 0) {
      return StatuCode.NOT_FOUND("No user found.");
    }

    return StatuCode.OK({ list: result, total });
  } catch (error) {
    // Rollback in case of error
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatuCode.ERROR(error.message);
  } finally {
    // Release the connection back to the pool
    if (connection) {
      await connection.release();
    }
  }
};

const update = async (username, email, id) => {
  let connection;
  try {
    connection = await DB.getConnection();

    await connection.beginTransaction();

    const sql = `UPDATE Users SET username = ?, email = ? WHERE id = ?`;

    const [result] = await connection.query(sql, [username, email, id]);

    if (result.affectedRows != 1) {
      await connection.rollback();
      return StatuCode.ERROR("Not Updated!");
    }

    await connection.commit();

    return StatuCode.OK(null, "User Data is Updated");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatuCode.ERROR(error.message);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

const deleteData = async (id) => {
  let connection;
  try {
    connection = await DB.getConnection();

    await connection.beginTransaction();

    const sql = `DELETE FROM Users WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);
    console.log("Delete result : ", result);

    if (result.affectedRows != "1") {
      await connection.rollback();
      return StatuCode.ERROR("Not Deleted!");
    }

    await connection.commit();
    return StatuCode.OK(null, "User Data is deleted!");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatuCode.ERROR(error.message);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

const searchMail = async (email) => {
  let connection;
  try {
    connection = await DB.getConnection();

    const sql = `SELECT * FROM Users WHERE email = ?`;
    const [result] = await connection.query(sql, [email]);

    if (result.length == 0) {
      return StatuCode.NOT_FOUND("No user found.");
    }

    return StatuCode.OK(result[0]);
  } catch (error) {
    console.log(error);
    return StatuCode.ERROR(error.message);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

module.exports = {
  create,
  list,
  update,
  deleteData,
  searchMail,
};
