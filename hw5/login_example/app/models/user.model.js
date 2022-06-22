const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            rule: {
                allowNull: true,
                type: DataTypes.STRING
            }
        }
    );

    return User;
};