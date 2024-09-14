exports.uploadFile = async (req, res, next) => {
  console.log("Req file: ", req.file);

  return res.status(200).json({
    scccess: true,
    data: req.body,
    file: req.file,
  });
};
