const { request } = require("express");
const express = require("express");
const router = express.Router();
const signuptemplatesCopy = require("../models/Signupmodels");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const slatPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, slatPassword);

  const signedUpUser = new signuptemplatesCopy({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    mothername: req.body.mothername,
    fathername: req.body.fathername,
    adharrcard: req.body.adharrcard,
    schoolname: req.body.schoolname,
    registration: req.body.registration,
    totalmarks: req.body.totalmarks,
    voterid: req.body.voterid,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// router.post("/signup", async (req, res) => {
//   const body = req.body;
//   try {
//     const newImage = await Post.create(body);
//     newImage.save();
//     res.status(201).json({ msg: "New image uploaded...!" });
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// });

// router.get("/info/:username", (req, res) => {
//   signuptemplatesCopy
//     .find({ username: req.params.username })
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get('/users/:username', (req, res) => {
//   User.find({ username: req.params.username }, (err, users) => {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Internal server error' });
//     } else {
//       res.status(200).json(users);
//     }
//   });
// });

module.exports = router;
