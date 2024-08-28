const User = require("../models/user");
const db = require("../utils/database");

exports.createUser = async (req, res, next) => {
  await User.create({
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
  })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "User created",
        data: res,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Create user failed",
        error: err,
      });
    });
};
