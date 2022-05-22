const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Conncetion = sequelize.define("connections", {
            requester_group: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            sent: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            status: {
                allowNull: false,
                defaultValue: 0,
                type: DataTypes.INTEGER
            }
        },
    );

    return Conncetion;
};
