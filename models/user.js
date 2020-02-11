//const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  favorite: { type: Schema.Types.ObjectId, ref: "Favorite" },
  date: {
    type: Date,
    default: Date.now
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
