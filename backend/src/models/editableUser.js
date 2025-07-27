const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a minimal schema for editable fields only
const editableUserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [25, "First name too long (max 25 characters)"],
  },
  lastName: {
    type: String,
    trim: true,
    minLength: [2, "Last name must be at least 2 characters"],
    maxLength: [25, "Last name too long (max 25 characters)"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (val) => require("validator").isURL(val),
      message: "Invalid URL format",
    },
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Gender must be either male, female, or other",
    },
  },
  age: {
    type: Number,
    min: [18, "Age is not valid"],
    max: [100, "Age seems unrealistic"],
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
      message: "Maximum 5 skills are allowed",
    },
  },
});

module.exports = mongoose.model("EditableUser", editableUserSchema);
