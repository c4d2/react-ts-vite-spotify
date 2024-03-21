const { default: mongoose } = require("mongoose");
const { ChatMessageSchema } = require("../models/messageModel");

// 获取某个聊天室的所有信息
module.exports.getChatMessages = async (req, res, next) => {
  const { id, pageNumber, pageSize } = req.query;
  const ChatMessages = mongoose.model("message" + id, ChatMessageSchema);
  const startIndex = pageNumber * pageSize;
  try {
    const messages = await ChatMessages.find()
      .skip(startIndex)
      .limit(pageSize)
      .sort({ updatedAt: -1 });
    console.log(messages);
    const projectedChatMessages = messages.map((msg) => {
      return {
        userid: msg.userid,
        message: msg.message,
        currenttime: msg.updatedAt,
        avatarImage: msg.avatarImage,
        username: msg.username,
      };
    });
    if (projectedChatMessages) return res.json(projectedChatMessages);
    else return res.status(400).json({ msg: "获取聊天室失败" });
  } catch (ex) {
    next(ex);
  }
};

// 添加某个聊天室信息
module.exports.addChatMessage = async (req, res, next) => {
  const { id } = req.body;

  const ChatMessages = mongoose.model("message" + id, ChatMessageSchema);
  try {
    const { userid, message, avatarImage, username } = req.body;
    console.log(id, userid, message, avatarImage, username);
    const data = await ChatMessages.create({
      message: message,
      userid: userid,
      avatarImage: avatarImage,
      username: username,
    });
    if (data) return res.json({ msg: "成功添加信息" });
    else return res.status(400).json({ msg: "难以添加信息到数据库" });
  } catch (ex) {
    next(ex);
  }
};
