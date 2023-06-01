const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

mongoose
  .connect("mongodb://0.0.0.0:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("This is a login page");
});

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
