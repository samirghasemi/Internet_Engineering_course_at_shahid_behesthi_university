// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
      "/api/v1/auth/signup",
      controller.signup
  );

  app.post(
      "/api/course/",
      controller.signup
  );

  app.post("/api/v1/auth/login", controller.login);
};
