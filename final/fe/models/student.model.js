const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("students", {
            student_id: {
                allowNull: false,
                unique: true,
                type: DataTypes.INTEGER
            },
            average: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0
            }
        }
    );

    return User;
};