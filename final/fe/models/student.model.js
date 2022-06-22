const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("students", {
            student_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            average: {
                allowNull: false,
                type: DataTypes.FLOAT,
                default: 0
            }
        }
    );

    return User;
};