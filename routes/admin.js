const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//============= Routes ======================
router.post("/api/admin/login", (req, res) => {
  const useremail = "admin@moladetreats.com";
  const userpassword = "molade2021";
  if (useremail === req.body.email && userpassword === req.body.password) {
    const token = jwt.sign({ _id: "1234" }, "molade2021");
    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.send({ message: true });
  } else {
    console.log("no");
  }
});

router.post("/api/admin/confirm", (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, "molade2021");
    if (!claims) {
      return res.status(401).send({ message: "failed" });
    }
    const token = jwt.sign({ _id: "1234" }, "molade2021");
    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.send({ message: true });
  } catch (e) {
    return res.status(401).send({ message: false });
  }
});

router.post("/api/admin/logout", (req, res) => {
  res.cookie("jwt", { maxAge: 0 });
  res.send({ message: true });
});

module.exports = router;
