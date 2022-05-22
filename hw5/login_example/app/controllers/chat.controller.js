const db = require("../models");
const Chat = db.chat;
const User = db.user;
const {Op,} = require("sequelize");

exports.getChat = async (req, res) => {
    try {
        let a = req.userId
        const [results, _metadata] = await db.sequelize.query(
            `with sender as (select sender as user, max(date) as date from chats where receiver = ${a} group by sender),
                 receiver as (select receiver as user, max(date) as date from chats where sender = ${a} group by sender),
                 res as (select user, date from sender union select user, date from receiver),
                 res2 as (select user, max(date) as date from res group by user order by date)
            select res2.user as userId, users.name
            from res2
            inner join users
                on res2.user = users.id`
        );
        return res.status(200).send({chats: results});

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.getChatPerUser = async (req, res) => {
    try {
        const chats = await Chat.findAll({
                attributes: [['text', 'message'], 'date', ['sender', 'sent_by']],
                order: [['date', 'DESC']],
                where: {
                    [Op.or]: [
                        {sender: req.userId, receiver: req.params.user_id},
                        {sender: req.params.user_id, receiver: req.userId}
                    ]
                }
            }
        )
        return res.status(200).send({messages: chats});
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.setChat = async (req, res) => {
    try {
        // this_user
        const this_user = await User.findOne({
            where: {
                id: req.userId,
            },
        });
        const user = await User.findOne({
            where: {
                id: req.params.user_id,
            },
        });
        const [results, _metadata] = await db.sequelize.query(`
        with res as (select requester_group, groupId
            from connections
            where ((requester_group = ${this_user.groupId} and groupId = ${user.groupId}) or (requester_group = ${user.groupId} and groupId = ${this_user.groupId})) and status = 1)
            select count(*) as cnt
            from res
        `)
        if(results[0].cnt){
            Chat.create({
                sender: req.userId,
                receiver: req.params.user_id,
                date: Math.floor(Date.now() / 1000),
                text: req.body.message
            });
            res.status(200).send({message: "successful"});
        }else{
            res.status(400).send({error: {message: "Bad request!"}});
        }

    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};
