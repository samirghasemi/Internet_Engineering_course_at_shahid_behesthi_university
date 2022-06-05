module.exports = {
  HOST: "mysql.db.samirghasemi.ir",
  USER: "root",
  PASSWORD: "12345678",
  DB: "ie_hw5",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
