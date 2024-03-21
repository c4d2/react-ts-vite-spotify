const mongoose = require("mongoose");

const ChatRoomSchema = mongoose.Schema(
  {
    roomname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    imagename: {
      type: String,
      default: "",
    },
    lastmessage: {
      type: String,
      default: "",
    },
    lastmessagetime: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);
