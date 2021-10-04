const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
//============= Routes ======================
router.post("/api/order/add", async (req, res) => {
  const orderCode = Math.floor(Math.random() * 20000000) + 10000000;
  const order = new Order({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    cost: req.body.cost,
    status: "open",
    cart: req.body.cart,
    orderNo: orderCode,
  });

  // console.log(req.body);
  const result = await order.save();
  if (result) {
    console.log(result);

    res.status(200).send({ message: result });
  } else {
    res.status(500).send({ message: "Order failed" });
  }
});

router.get("/api/order/all", (req, res) => {
  Order.find()
    .then((result) => {
      const data = result.filter((item) => item.status === "open");
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/order/delete", (req, res) => {
  Order.remove({}, function (err) {
    // delete all
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
});

router.get("/api/order/close", async (req, res) => {
  let id = req.query.id;
  const resp = await Order.findOneAndUpdate(
    { _id: id },
    { status: "close" },
    { new: true },
    (error, result) => {
      if (result) {
        console.log(result);
        res.status(200).send({ message: "Order closed" });
        return result;
      } else {
        console.log(error);
      }
    }
  );
  console.log(resp);
});

router.get("/api/order/:id", async (req, res) => {
  const id = req.params.id;
  const order = await Order.findOne({ _id: id });
  if (!order) {
    console.log("not found");
  } else {
    const { cart, ...result } = order;
    res.status(200).send({ order, cart });
  }
});

// router.get("/api/order/close/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log("hello");
// const resp = await Order.findOneAndUpdate(
//   { _id: id },
//   { status: "close" },
//   { new: true },
//   (error, result) => {
//     if (result) {
//       console.log(result);
//       return result;
//     } else {
//       console.log(error);
//     }
//   }
// );
//   res.send({ message: "Order closed" });
// });

router.get("/api/order/dispatch/id", (req, res) => {
  res.send({ message: "endpoint to dispatch an order" });
});

module.exports = router;
