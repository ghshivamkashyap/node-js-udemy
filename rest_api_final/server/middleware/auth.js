const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("Token missing");
    return res.status(401).json({
      success: false,
      message: "Token missing in Authorization header",
    });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }

    req.user = decodedToken;

    next();
  } catch (err) {
    console.log("Token error: ", err);
    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
