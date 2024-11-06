const DB = require("../helper/database_helper");
const StatusCode = require("../helper/status_code_helper");

const create = async (role_name, description) => {
  let connection;
  try {
    connection = await DB.getConnection();

    connection.beginTransaction();
    const sql = `INSERT INTO Roles (role_name,description) VALUE (?,?)`;
    const [result] = await connection.query(sql, [role_name, description]);
    if (result.affectedRows == "0") {
      if (connection) await connection.rollback();
      return StatusCode.ERROR("Roles creation fail.");
    }
    await connection.commit();
    return StatusCode.OK(null, "Roles createin successful.");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return StatusCode.ERROR(error.message);
  } finally {
    if (connection) {
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
    const countQuery = `SELECT COUNT(*) AS total FROM Roles`;
    const [countResult] = await connection.query(countQuery);
    const total = countResult[0].total;
    console.log(total);

    // Select query
    const sql = `SELECT id,role_name, description created_at FROM Roles ORDER BY id DESC LIMIT ? OFFSET ?`;
    const [result] = await connection.query(sql, [page_size, offset]);
    console.log("List Result: ", result);

    // Commit transaction after both queries are successful
    await connection.commit();

    if (result.length == 0) {
      return StatusCode.NOT_FOUND("No role found.");
    }

    return StatusCode.OK({ list: result, total });
  } catch (error) {
    // Rollback in case of error
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatusCode.ERROR(error.message);
  } finally {
    // Release the connection back to the pool
    if (connection) {
      await connection.release();
    }
  }
};

const update = async (role_name, description, id) => {
  let connection;
  try {
    connection = await DB.getConnection();

    await connection.beginTransaction();

    const sql = `UPDATE Roles SET role_name = ?, description = ? WHERE id = ?`;

    const [result] = await connection.query(sql, [role_name, description, id]);

    if (result.affectedRows != 1) {
      await connection.rollback();
      return StatusCode.ERROR("Not Updated!");
    }

    await connection.commit();

    return StatusCode.OK(null, "Role Data is Updated");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatusCode.ERROR(error.message);
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

    const sql = `DELETE FROM Roles WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);
    console.log("Delete result : ", result);

    if (result.affectedRows != "1") {
      await connection.rollback();
      return StatusCode.ERROR("Not Deleted!");
    }

    await connection.commit();
    return StatusCode.OK(null, "Role Data is deleted!");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log(error);
    return StatusCode.ERROR(error.message);
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
};
