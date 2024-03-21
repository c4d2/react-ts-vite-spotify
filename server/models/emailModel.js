const mongoose = require("mongoose");

const EmailSchema = mongoose.Schema({
  verCode: {
    required: true,
    type: String,
  },
  register_email: {
    type: String,
    required: true,
  },
  expiration_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Email", EmailSchema);
