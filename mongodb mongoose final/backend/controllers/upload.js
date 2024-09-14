exports.uploadFile = async (req, res, next) => {
  console.log("Req file: ", req.file);

  return res.status(200).json({
    scccess: true,
    file: req.file.path,
  });
};
