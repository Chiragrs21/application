const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
  console.log("connected sussefully");
});

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);

app.listen(4000, "0.0.0.0", () =>
  console.log("server is running on port 4000")
);
