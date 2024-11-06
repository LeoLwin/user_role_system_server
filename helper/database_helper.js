const util = require("util");
const mysql = require("mysql2/promise");
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
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    console.log("DB connected successfully");
    // Test with a simple query to ensure the connection works
    await connection.query("SELECT 1");
    console.log("Test query successful");

    // Release the connection back to the pool
    connection.release();
  } catch (err) {
    console.log("Error connecting to the database: ", err);
  }
};

testConnection();

module.exports = pool;
