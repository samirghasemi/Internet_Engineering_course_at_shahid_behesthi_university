const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.sequelize = sequelize;

db.student = require("./student.model.js")(sequelize, Sequelize);
db.course = require("../models/course.model.js")(sequelize, Sequelize);


db.student.hasMany(db.course);
db.course.belongsTo(db.student);

module.exports = db;
