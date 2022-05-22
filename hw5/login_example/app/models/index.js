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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.group = require("../models/group.model.js")(sequelize, Sequelize);
db.join = require("../models/join.model.js")(sequelize, Sequelize);
db.connection = require("../models/connection.model.js")(sequelize, Sequelize);

db.group.hasMany(db.user, {as: "users"});
db.user.belongsTo(db.group, {
    as: "groups",
    foreignKey: "groupId",
});

db.group.hasMany(db.join, {as: "joins"});
db.join.belongsTo(db.group, {
    as: "groups",
    foreignKey: "groupId",
});

db.user.hasMany(db.join, {as: "joins"});
db.join.belongsTo(db.user, {
    as: "users",
    foreignKey: "userId",
});

db.group.hasMany(db.connection, {as: "connections"});
db.connection.belongsTo(db.group, {
    as: "groups",
    foreignKey: "groupId",
})

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
