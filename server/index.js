const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
  console.log("connected successfully");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/send-email", upload.array("files"), async (req, res) => {
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

app.use("/app", routesUrls);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong." });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
