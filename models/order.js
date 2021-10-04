const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    cart: [
      // {
      //   id: {
      //     type: String,
      //   },
      //   name: {
      //     type: String,
      //   },
      //   image: {
      //     type: String,
      //   },
      //   price: {
      //     type: Number,
      //   },
      //   Qty: {
      //     type: Number,
      //   },
      // },
    ],
    orderNo: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
