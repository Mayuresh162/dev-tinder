const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { userValidate } = require("../middlewares/validate");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

profileRouter.patch(
  "/profile/edit",
  userAuth,
  userValidate,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );

      await loggedInUser.save();

      res.json({
        message: `${loggedInUser.firstName}, your profile updated successfuly`,
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { emailId, oldPassword, newPassword } = req.body;
    const loggedInUser = await User.findOne({ emailId });
    if (!loggedInUser) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (isPasswordValid) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      loggedInUser.password = passwordHash;
      await loggedInUser.save();
      res.json({
        message: `${loggedInUser.firstName}, your password updated successfuly`,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = profileRouter;
