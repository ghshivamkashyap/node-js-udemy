const path = require("path");

exports.uploadFile = async (req, res, next) => {
  console.log("Req file: ", req.file);

  const fixedFilePath = req.file.path.replace(/\\/g, "/");

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  return res.status(200).json({
    success: true,
    data: req.body,
    url: fileUrl,
  });
};
