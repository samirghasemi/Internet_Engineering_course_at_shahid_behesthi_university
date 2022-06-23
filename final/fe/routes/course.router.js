// const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");

const controller = require("../controllers/course.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
      "/course/:studentid",
      controller.get
  );

  app.post(
      "/course/:studentid/course",
      controller.create
  );

  app.put(
      "/course/:studentid/:courseid",
      controller.update
  );

  app.delete(
      "/course/:studentid/:courseid",
      controller.delete
  );
};
