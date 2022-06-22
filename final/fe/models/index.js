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


db.student.hasMany(db.course, {as: "courses"});
db.course.belongsTo(db.student, {
    as: "students",
    foreignKey: "student_id",
});

// db.group.hasMany(db.join, {as: "joins"});
// db.join.belongsTo(db.group, {
//     as: "groups",
//     foreignKey: "groupId",
// });
//
// db.user.hasMany(db.join, {as: "joins"});
// db.join.belongsTo(db.user, {
//     as: "users",
//     foreignKey: "userId",
// });
//
// db.group.hasMany(db.connection, {as: "connections"});
// db.connection.belongsTo(db.group, {
//     as: "groups",
//     foreignKey: "groupId",
// })

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
