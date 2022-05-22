const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Join = sequelize.define("joins", {
            date: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
        },
    );

    return Join;
};
