module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "12345678",
  DB: "abbasdb",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
