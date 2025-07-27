const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();
// const User = require("./models/user");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is listening at 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed!!", err);
  });
