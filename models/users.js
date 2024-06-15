const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

// membuat schema

const User = mongoose.model("User", {
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
   createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User;
