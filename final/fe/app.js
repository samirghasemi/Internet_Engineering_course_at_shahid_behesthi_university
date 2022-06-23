const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// database
const db = require("./models");
db.sequelize.sync();

//router
require("./routes/student.router")(app)
require("./routes/course.router")(app)

// set port, listen for requests
const PORT = 35300;
app.listen(PORT, () => {
  console.log(`Abbas Server is running on port ${PORT}.`);
});

