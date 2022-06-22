const db = require("../models");
const User = db.user;
const Group = db.group;
const Join = db.join;
const Connection = db.connection;

exports.getRequests = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        if (user.rule === "Owner") {
            const reqs = await Connection.findAll({
                attributes: [['id', 'connectionRequestId'], 'groupId', 'sent'],
                order: [['sent', 'DESC']],
                where: {
                    groupId: user.groupId,
                }
            })
            return res.status(200).send({
                requests: reqs
            });
        } else {
            res.status(400).send({error: {message: "Bad request!"}});
        }
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setRequest = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        if (!user.groupId) {
            return res.status(400).send({error: {message: "Bad request!"}});
        } else {
            const user = await User.findOne({
                where: {
                    id: req.userId,
                },
            });
            const group = await Group.findOne({
                where: {
                    id: req.body.groupId,
                },
            });
            if (group) {
                await Connection.create({
                    requester_group: user.groupId,
                    groupId: req.body.groupId,
                    sent: Math.floor(Date.now() / 1000),
                    status: 0
                });
                return res.status(200).send({
                    message: "successful"
                });
            }
        }
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setRequestAccept = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        const connection = await Connection.findOne({
            where: {
                id: req.body.connectionRequestId,
            },
        });

        if (user.groupId === connection.groupId) {
            await Connection.update(
                {
                    status: 1
                },
                {
                    where: {
                        id: req.body.connectionRequestId,
                    }
                });
            res.status(200).send({message: "successful"});
        } else {
            res.status(400).send({error: {message: "Bad request!"}});
        }


    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};
