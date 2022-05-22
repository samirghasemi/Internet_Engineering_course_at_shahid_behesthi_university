const {authJwt, verifySignUp} = require("../middleware");
const controller = require("../controllers/chat.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/v1/chats",
        [
            authJwt.verifyToken,
        ],
        controller.getChat
    );


    app.get(
        "/api/v1/chats/:user_id",
        [
            authJwt.verifyToken,
        ],
        controller.getChatPerUser
    );

    app.post(
        "/api/v1/chats/:user_id",
        [
            authJwt.verifyToken,
        ],
        controller.setChat
    );
};
