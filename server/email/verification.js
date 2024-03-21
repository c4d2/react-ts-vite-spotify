const nodemailer = require("nodemailer");
const credentials = require("../config/credentials");
// 配置对象
const config = {
  service: "163",
  auth: {
    user: credentials.qq.user,
    pass: credentials.qq.pass,
  },
};

// 创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(config);

// 发送邮件调用
exports.emailSignUp = async function (email, verCode, res) {
  // 创建一个选项
  let options = {
    //发件人 邮箱 '昵称发件人邮箱'
    from: "songyuwen2023@163.com",
    subject: "云音乐激活码",
    // 收件人的邮箱可以时其他邮箱
    to: email,
    //这里可以添加html标签
    html: `您的激活验证码为：${verCode},四分钟内有效，请谨慎保管`,
  };

  // 发送邮件
  await transporter.sendMail(options, function (err, msg) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send("验证码发送成功");
    }
  });
};
