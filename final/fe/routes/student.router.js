// const { verifySignUp } = require("../middleware");
const controller = require("../controllers/student.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get(
  //     "/students",
  //     controller.get
  // );

  app.post(
      "/students",
      controller.create
  );

  // app.put(
  //     "/students/:id",
  //     controller.update
  // );
  //
  // app.delete(
  //     "/students/:id",
  //     controller.delete
  // );

};
