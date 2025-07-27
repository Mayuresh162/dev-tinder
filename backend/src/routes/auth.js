const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: passwordHash });
    const savedUser = await user.save();
    const token = await savedUser.generateToken();

    res.cookie("accessToken", token, {
      maxAge: 21600000,
    });
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const loggedInUser = await User.findOne({ emailId });
    if (!loggedInUser) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await loggedInUser.validatePassword(password);
    if (isPasswordValid) {
      const token = await loggedInUser.generateToken();

      res.cookie("accessToken", token, {
        maxAge: 21600000,
      });
      res.json({
        message: `${loggedInUser.firstName} loggedin successfully!`,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("accessToken", null, {
    maxAge: 0,
  });
  res.json({ message: "Logout Successfully" });
});

module.exports = authRouter;
