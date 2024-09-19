exports.getFeed = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Get all feeds called",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};
