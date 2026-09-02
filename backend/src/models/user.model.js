const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isBanned:{
    default:false,
    enum:[false,true],
    type: Boolean,
  }
},{timestamps: true});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
