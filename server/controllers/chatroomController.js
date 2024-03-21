const ChatRoom = require("../models/chatroomModel");
const User = require("../models/userModel");

// 创建聊天室
module.exports.AddRoom = async (req, res, next) => {
  const { username, password, roomname, imagename } = req.body;
  // 查看是否为数据库中管理员
  const userData = await User.findOne({ username, password });
  if (userData && userData.isAdmin) {
    const newroom = await ChatRoom.create({
      roomname,
      imagename,
    });
    if (newroom) {
      return res.json({ msg: "创建聊天室成功！", newroom });
    } else {
      return res.status(400).json({ msg: "创建聊天室失败！" });
    }
  } else {
    return res.status(400).json({ msg: "没有权限创建聊天室！" });
  }
};

// 查询现有聊天室用以呈现
module.exports.getChatRoom = async (req, res, next) => {
  try {
    const room = await ChatRoom.find().sort({ updatedAt: 1 });
    return res.json(room);
  } catch (ex) {
    next(ex);
  }
};
