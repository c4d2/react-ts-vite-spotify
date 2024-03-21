const mongoose = require("mongoose");

const InviteSchema = mongoose.Schema({
  inviteCode: {
    required: true,
    type: String,
  },
  comments: {
    type: String,
    default: "神秘地带",
  },
  expiration_time: {
    type: Date,
    default: Date.now,
    expires: "1d",
  },
});

module.exports = mongoose.model("Invite", InviteSchema);
