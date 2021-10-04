const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

const messageRoute = require("./routes/message");
const adminRoute = require("./routes/admin");
const orderRoute = require("./routes/orders");
const foodRoute = require("./routes/food");

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5050;

//create connection to mongodb database
mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  // Start server only if connected to database
  .then(() => {
    app.listen(port, () => {
      console.log("Molade server started on port", port);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

//=================Server settings ==================
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "handlebars");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("file");
// ==================================================

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    return res.status(200).send(req.file);
  });
});

app.get("/order/close", (req, res) => {
  res.send({ message: "hello " });
});

app.use(messageRoute);
app.use(adminRoute);
app.use(foodRoute);
app.use(orderRoute);
