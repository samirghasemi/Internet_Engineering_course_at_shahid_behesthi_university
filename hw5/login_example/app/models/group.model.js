const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
    });

    return Group;
};
