const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requird: true,
  },
});
const User1 = mongoose.model("users", userDataSchema);

//creates indexes for all unique values in the database
// User1.createIndexes();
module.exports = User1;
