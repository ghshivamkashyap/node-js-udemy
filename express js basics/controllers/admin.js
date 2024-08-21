exports.adminController = (req, res, next) => {
  console.log("Req body: ", req.body);
  return res.status(200).json({
    success: true,
    message:
      "i am from  route admin / a",
    data: req.body,
  });
};

exports.slaveController = (req, res, next) => {
  console.log("Req body: ", req.body);
  return res.status(200).json({
    success: true,
    message: "i am from route admin / b",
    data: req.body,
  });
};
