const {authJwt, verifySignUp} = require("../middleware");
const controller = require("../controllers/join.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/v1/join_requests",
        [
            authJwt.verifyToken,
        ],
        controller.getRequests
    );

    app.post(
        "/api/v1/join_requests",
        [
            authJwt.verifyToken,
        ],
        controller.setRequest
    );

    app.get(
        "/api/v1/join_requests/group",
        [
            authJwt.verifyToken,
        ],
        controller.getRequestsByGroup
    );

    app.post(
        "/api/v1/join_requests/accept",
        [
            authJwt.verifyToken,
        ],
        controller.setRequestsAccept
    );

    // app.post("/api/v1/auth/login", controller.signin);

    // app.get("/api/test/all", controller.allAccess);
    //
    // app.get(
    //   "/api/test/user",
    //   [authJwt.verifyToken],
    //   controller.userBoard
    // );
    //
    // app.get(
    //   "/api/test/mod",
    //   [authJwt.verifyToken, authJwt.isModerator],
    //   controller.moderatorBoard
    // );
    //
    // app.get(
    //   "/api/test/admin",
    //   [authJwt.verifyToken, authJwt.isAdmin],
    //   controller.adminBoard
    // );
};
