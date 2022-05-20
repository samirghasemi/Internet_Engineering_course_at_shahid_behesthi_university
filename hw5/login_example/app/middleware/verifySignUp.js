const db = require("../models");
const User = db.user;

checkDuplicateEmail = async (req, res, next) => {
  let user;
  try {
    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({error: {message: "Bad request!"}});
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};


const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
