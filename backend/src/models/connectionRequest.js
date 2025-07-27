const mongoose = require("mongoose");

const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId of user sending request is required"],
    },
    toUserId: {
      type: String,
      ref: "User",
      required: [true, "UserId of user receiving request is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} is not valid status`,
      },
      required: [true, "Status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
