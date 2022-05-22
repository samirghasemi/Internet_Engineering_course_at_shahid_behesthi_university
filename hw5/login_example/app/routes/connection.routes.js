const {authJwt, verifySignUp} = require("../middleware");
const controller = require("../controllers/connection.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/v1/connection_requests",
        [
            authJwt.verifyToken,
        ],
        controller.getRequests
    );


    app.post(
        "/api/v1/connection_requests",
        [
            authJwt.verifyToken,
        ],
        controller.setRequest()
    );

    app.post(
        "/api/v1/connection_requests/accept",
        [
            authJwt.verifyToken,
        ],
        controller.setRequestsAccept()
    );
};
