const util = require("util");
const mysql = require("mysql2");
const config = require("../config/dbConfig");

// console.log({
//   host: config.HOST,
//   user: config.USER,
//   port: config.PORT,
//   password: config.PASSWORD,
//   database: config.DATABASE,
// });


// Create a connection pool using the provided configuration
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  port: config.DB_PORT,
  password: config.PASSWORD,
  database: config.DATABASE,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("db con err");
    console.log(err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) {
    console.log("db connected");
    connection.release();
  } else {
    console.log("db disconnected");
  }

  return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
