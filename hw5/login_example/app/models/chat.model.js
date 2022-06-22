const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chats", {
        sender: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        receiver:{
            allowNull: false,
            type: DataTypes.INTEGER
        },
        text: {
            allowNull: false,
            type: DataTypes.STRING
        },
        date: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    });

    return Chat;
};
