const { emailSignUp } = require("../email/verification");
const email = require("../models/emailModel");
const User = require("../models/userModel");

// 发送邮箱
module.exports.sendEmail = async (req, res) => {
  let mail = req.body.email;
  //首先判断user里面是否已经有email了
  const emailCheckUser = await User.findOne({ email });
  if (emailCheckUser) return res.status(400).json({ msg: "邮箱已经存在" });
  let verCode = verCodeGenerate();
  await emailSignUp(mail, verCode, res).catch((e) => {
    return res.status(400).send({ msg: "验证码发送失败!" });
  });

  // 创造一个mailer 限时4分钟
  let mailer = {
    verCode,
    register_email: mail,
    expiration_time: new Date(new Date().valueOf() + 1000 * 60 * 4),
  };

  // 如果数据库里面已经有这个邮箱
  let emailCheck = await email.findOne({ register_email: mail });
  let data;
  if (emailCheck) {
    const filter = { register_email: mail };
    data = await email.findOneAndUpdate(filter, mailer, { new: true });
  } else {
    // 发送完之后保存到数据库 供前端进行数据判断
    data = await email.create(mailer);
  }
  if (data) return res.json({ msg: "成功发送邮件", status: 0 });
  else return res.status(400).json({ msg: "请重新发送邮件！" });
};

// 生成验证码
function verCodeGenerate() {
  let res = "";
  // 生成6位随机数即可 由于仅为练习，不必用太高深的生成
  for (let i = 0; i < 6; i++) {
    res += Math.floor(Math.random() * 9 + 1);
  }
  return res;
}
