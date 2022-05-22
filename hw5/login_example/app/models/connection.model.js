const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Conncetion = sequelize.define("connections", {
            sent: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
        },
    );

    return Conncetion;
};
