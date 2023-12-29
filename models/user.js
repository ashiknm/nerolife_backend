// import mongoose database.
const mongoose = require("mongoose");

//make the user Schema
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    job_title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// make the User module for exporting.
const User = mongoose.model("user", userSchema);

// export this User class created.
module.exports = User;
