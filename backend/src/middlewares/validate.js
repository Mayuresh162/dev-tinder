const EditableUser = require("../models/editableUser");

const userValidate = async (req, res, next) => {
  try {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "imageUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];

    // Filter only allowed fields from req.body
    const filteredUpdate = {};
    for (let key of allowedEditFields) {
      if (key in req.body) {
        filteredUpdate[key] = req.body[key];
      }
    }

    const tempUser = new EditableUser(filteredUpdate);
    const validationError = await tempUser.validate();

    if (validationError) {
      const messages = Object.values(validationError.errors).map(
        (err) => err.message
      );
      throw new Error({ errors: messages });
    }
    req.userUpdates = filteredUpdate;
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  userValidate,
};
