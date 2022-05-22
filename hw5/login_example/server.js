const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/join.routes")(app);
require("./app/routes/connection.routes")(app);

// set port, listen for requests
const PORT = 35300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

