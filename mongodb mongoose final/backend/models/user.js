const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
      },
      quantity: { type: Number, required: true },
    },
  ],

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// we can write functions here also
// UserSchema.methods.addToCart = function () {

// };

module.exports = mongoose.model("User", UserSchema);
