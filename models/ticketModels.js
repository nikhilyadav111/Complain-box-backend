const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    product: {
      type: String,
      require: [true, "Please fill product name"],
      enum: ["iPad", "iPhone", "iMac", "Macbook", "iWatch"],
    },
    description: {
      type: String,
      require: [true, "Please Describe your Issue!!"],
    },
    status: {
      type: String,
      require: true,
      enum: ["open", "new", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Ticket", ticketSchema);
