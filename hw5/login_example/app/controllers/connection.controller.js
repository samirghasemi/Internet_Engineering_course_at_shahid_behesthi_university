const db = require("../models");
const Group = db.group;
const User = db.user;
const Join = db.join;
const Connection = db.connection;

exports.getRequests = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setRequest = async (req, res) => {
    try {
            return res.status(400).send({error: {message: "Bad request!"}});
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setRequestsAccept = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};
