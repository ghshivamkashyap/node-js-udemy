const User = require("../models/user");

exports.createUser = async (req, res, nest) => {
  const { name, email } = req.body;
  try {
    const user = new User({
      name: name,
      email: email,
    });

    let result = await user.save();

    return res.status(200).json({
      success: true,
      message: "User created",
      result: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
      params_passed: req.params.id,
    });
  }
};

exports.addToCart = async (req, res, next) => {
  const { itemId, userId, qty } = req.body;
  console.log("Req: ", req.body);

  try {
    let result = await User.findByIdAndUpdate(
      userId,
      {
        $push: { cart: { productId: itemId, quantity: qty } },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      result: result,
    });
  } catch (err) {
    console.error("Error saving user: ", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  console.log("Req: ", id);

  try {
    let result = await User.findById(id).populate('cart.productId');

    return res.status(200).json({
      success: true,
      message: "user found",
      result: result,
    });
  } catch (err) {
    console.error("Error finding user: ", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
