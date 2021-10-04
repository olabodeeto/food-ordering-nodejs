const express = require("express");
const router = express.Router();
const multer = require("multer");
const Food = require("../models/food");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const maxSize = 2 * 1024 * 1024;

const upload = multer({ storage }).single("file");

//============= Routes ======================
router.post("/api/food/upload", (req, res) => {
  var foodImage;
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    foodImage = req.file.filename;
    console.log(foodImage);
    return res.status(200).send({ image: foodImage });
  });
});

router.post("/api/food/add", async (req, res) => {
  const food = new Food({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.foodimage,
  });

  const result = await food.save();
  if (!result) {
    res.status(500).send({ message: "error" });
  }
  console.log(result);
  res.status(200).send({ message: result });
});

router.get("/api/food/all", (req, res) => {
  Food.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/api/food/delete/", (req, res) => {
  Food.remove({}, function (err) {
    // delete all
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
});

router.get("/api/food/single/delete", async (req, res) => {
  let id = req.query.id;
  const resp = await Food.findOneAndDelete({ _id: id });
  if (resp) {
    console.log(resp);
    res.status(200).send({ message: "Food deleted" });
  }
});

module.exports = router;
