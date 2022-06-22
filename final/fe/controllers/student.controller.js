const db = require("../models");
// const config = require("../config/auth.config");
const User = db.user;


exports.create = async (req, res) => {
    try {
        const user = await User.create({
            student_id: req.body.studentid,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const token = jwt.sign({userId: user.id}, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        return res.status(200).send({
            token: token,
            message: "successful"
        });
    } catch (error) {
        res.status(400).send({error: {message: "Bad request!"}});
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(400).send({error: {message: "Bad request!"}});
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(400).send({error: {message: "Bad request!"}});
        }

        const token = jwt.sign({userId: user.id}, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).send({
            token: token,
            message: "successful"
        });
    } catch (error) {
        return res.status(400).send({error: {message: "Bad request!"}});
    }
};
