const { request } = require("express");
const express = require("express");
const router = express.Router();
const signuptemplatesCopy = require("../models/Signupmodels");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
  const files = req.files;

  if (!files || !files.length) {
    res.status(400).json({ message: "Please select at least one file." });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chiragrs153@gmail.com",
      pass: "chirag@1234",
    },
  });

  const mailOptions = {
    from: "chiragrs153@gmail.com",
    to: "chiragrs2003@gmail.com",
    subject: "Files uploaded",
    attachments: files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    })),
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

module.exports = router;
