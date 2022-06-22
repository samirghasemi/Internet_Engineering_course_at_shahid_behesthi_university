const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            course_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            grade: {
                allowNull: false,
                type: DataTypes.FLOAT
            }
        }
    );

    return Course;
};