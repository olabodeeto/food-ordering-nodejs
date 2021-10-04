const express = require("express");
const router = express.Router();
const Message = require("../models/message");

//============= Routes ======================
router.post("/api/message", async (req, res) => {
  const message = new Message({
    email: req.body.email,
    message: req.body.message,
  });
  const result = await message.save();
  if (!result) {
    res.status(500).send({ mssg: "Failed" });
  }
  res.status(200).send({ mssg: "sent" });
});

router.get("/api/messages", (req, res) => {
  Message.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/messages/delete", async (req, res) => {
  let id = req.query.id;
  const resp = await Message.findOneAndDelete({ _id: id });
  if (resp) {
    console.log(resp);
    res.status(200).send({ message: "Message deleted" });
  }
});

router.get("/api/messages/:id", async (req, res) => {
  const id = req.params.id;
  const mssg = await Message.findOne({ _id: id });
  if (!mssg) {
    console.log("not found");
  } else {
    res.status(200).send({ message: mssg });
  }
});

module.exports = router;
