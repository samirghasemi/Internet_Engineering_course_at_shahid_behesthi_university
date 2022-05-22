const db = require("../models");
const Group = db.group;
const User = db.user;

exports.myGroup = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        const group = await Group.findOne({
            where: {
                id: user.groupId,
            },
        });
        const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'rule'],
                where:{
                    groupId: user.groupId
                }
            }
        )
        return res.status(200).send({
            group: {
                name: group.name,
                description: group.description
            },
            members: users
        });
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.createGroup = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        let group;
        if (user.groupId) {
            return res.status(400).send({error: {message: "Bad request!"}});
        } else {

            group = await Group.create({
                name: req.body.name,
                description: req.body.description,
            });

            await User.update(
                {
                    groupId: group.id,
                    rule: "Owner"
                },
                {
                    where: {
                        id: req.userId,
                    }
                });
        }

        return res.status(200).send({
            group: {
                id: group.id
            },
            message: "successful"
        });
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.listALlGroup = async (req, res) => {
    try {
        const groups = await Group.findAll({
                attributes: ['id', 'name', 'description']
            }
        )

        return res.status(200).send({
            groups: groups
        });

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};