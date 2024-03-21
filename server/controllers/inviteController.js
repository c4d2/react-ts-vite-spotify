const Invite = require("../models/inviteModel");
const User = require("../models/userModel");

module.exports.addInviteCode = async (req, res) => {
  const { inviteCode, comments, username, password } = req.body;
  const userData = User.findOne({ username, password });
  if (!userData || !userData.isAdmin)
    return res.status(400).json({ msg: "没有创建邀请码的权限！" });
  const inviteData = await Invite.create({
    inviteCode,
    comments,
    expiration_time: new Date(),
  });
  // 邀请码创建
  if (inviteData) {
    return res.json({ msg: "邀请码创建成功！请在一天内发送给你的小伙伴" });
  } else {
    return res.status(400).json({ msg: "邀请码创建失败！" });
  }
};
