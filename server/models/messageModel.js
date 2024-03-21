const mongoose = require("mongoose");
module.exports.ChatMessageSchema = mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            require: true
        },
        avatarImage: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
    }
);
