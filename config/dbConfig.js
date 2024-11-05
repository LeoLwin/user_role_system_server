module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE, // Update to match the main file

  JWT_SECRET: process.env.JWT_SECRET,
};
