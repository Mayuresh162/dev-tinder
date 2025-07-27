const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).send({ message: "Please Login!" });
    }

    const decodedObj = await jwt.verify(accessToken, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  userAuth,
};
