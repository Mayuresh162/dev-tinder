const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [2, "First name must be at least 2 characters"],
      maxLength: [25, "First name too long (max 25 characters)"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: [2, "Last name must be at least 2 characters"],
      maxLength: [25, "Last name too long (max 25 characters)"],
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exist"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (val) => validator.isStrongPassword(val),
        message: "Please enter strong password",
      },
    },
    age: {
      type: Number,
      min: [18, "Age is not valid"],
      max: [100, "Age seems unrealistic"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not valid gender`,
      },
    },
    imageUrl: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/512/166/166246.png",
      validate: {
        validator: (val) => validator.isURL(val),
        message: "Invalid URL format",
      },
    },
    about: {
      type: String,
      maxLength: [500, "About section too long (max 500 characters)"],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 5;
        },
        message: "Minimum 5 skills are required",
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
