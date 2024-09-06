const order = require("../models/order");
const User = require("../models/user");
const { getUserById } = require("./user");

exports.createOrder = async (req, res, nest) => {
  const { user, products, amount } = req.body;

  try {
    let result = await order.create({
      user: user,
      products: products,
      amount: amount,
    });

    let deleteFromCartRes = await User.findByIdAndUpdate(user, {
      $set: { cart: [] },
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
      deleteFromCartRes: deleteFromCartRes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Create order failed",
      data: err.message,
    });
  }
};

exports.getAllOrders = async (req, res, nest) => {
  const { user, products, amount } = req.body;

  try {
    let result = await order
      .find()
      .populate("user")
      .populate("products.productId");

    res.setHeader("Set-Cookie", [
      "login=shivam",
      "age=23",
      "loginToken=12345678910",
      "sessionId=abc123; HttpOnly",
      "theme=light",
      "token=xyz789; Secure; SameSite=Strict",
    ]);
  
    return res.status(200).json({
      success: true,
      message: "all orders fetched successfully",
      data: result,
  
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Fetching order failed",
      data: err.message,
    });
  }
};
