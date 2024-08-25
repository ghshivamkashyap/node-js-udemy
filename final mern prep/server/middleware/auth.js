const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  console.log("req headers: ", req.headers);
  const token =await req.header("Authorization").replace("Bearer ", "") || "";
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }
  // return;
  try {
    const decoded = jwt.verify(token, "kashyapshivam");
    req.user = decoded;
    console.log("Token varifierd");
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
