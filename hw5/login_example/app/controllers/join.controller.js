const db = require("../models");
const Group = db.group;
const User = db.user;
const Join = db.join;

exports.getRequests = async (req, res) => {
    try {
        const reqs = await Join.findAll({
                attributes: ['id', 'groupId', 'userId', 'date'],
                order: [['date','DESC']],
                where: {
                    userId: req.userId,
                }
            }
        )
        return res.status(200).send({
            joinRequests: reqs
        });
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
        if (user.groupId) {

            return res.status(400).send({error: {message: "Bad request!"}});

        } else {

            const group = await Group.findOne({
                where: {
                    id: req.body.groupId,
                },
            });
            if (group) {
                join = await Join.create({
                    userId: req.userId,
                    groupId: req.body.groupId,
                    date: Math.floor(Date.now() / 1000)
                });

                return res.status(200).send({
                    message: "successful"
                });
            } else {
                return res.status(400).send({error: {message: "Bad request!"}});
            }
        }

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.getRequestsByGroup = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId,
            },
        });

        const reqs = await Join.findAll({
                attributes: ['id', 'groupId', 'userId', 'date'],
                order: [['date','DESC']],
                where: {
                    groupId: user.groupId,
                }
            }
        )


        return res.status(200).send({
            joinRequests: reqs
        });
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setRequestsAccept = async (req, res) => {
    try {
        const join = await Join.findOne({
            where: {
                id: req.body.joinRequestId,
            },
        });
        if(join){
            const this_user = await User.findOne({
                where: {
                    id: req.userId,
                },
            });
            const user = await User.findOne({
                where: {
                    id: join.userId,
                },
            });
            const group = await Group.findOne({
                where: {
                    id: join.groupId,
                },
            });
            console.log(user.groupId)
            if(!user.groupId){
                if (this_user.groupId===group.id && this_user.rule ==="Owner"){
                    await User.update(
                        {
                            groupId: group.id,
                            rule: "Member"
                        },
                        {
                            where: {
                                id: user.id,
                            }
                        });
                    res.status(200).send({message: "successful"});
                }else{
                    res.status(400).send({error: {message: "Bad request!"}});
                }

            }else{

                res.status(400).send({error: {message: "Bad request!"}});
            }
        }else{

            res.status(400).send({error: {message: "Bad request!"}});
        }
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};
