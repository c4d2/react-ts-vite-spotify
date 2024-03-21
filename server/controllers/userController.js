const User = require("../models/userModel");
const Email = require("../models/emailModel");
const Invite = require("../models/inviteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");

// 登录
module.exports.login = async (req, res, next) => {
  let { username, password } = req.body; // 使用req.body而不是req.query
  // 数据库查询用户
  const userData = await User.findOne({ username });
  if (userData && (await bcrypt.compare(password, userData.password))) {
    // 密码匹配，生成token
    const token = jwt.sign(
      { username, _id: userData._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.json({
      username,
      _id: userData._id,
      avatarImage: userData.avatarImage,
      password: userData.password,
      isAdmin: userData.isAdmin,
      token,
      msg: "登录成功",
    });
  } else {
    res.status(400).json({ msg: "用户名或密码错误" });
  }
};

// 注册
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password, verCode, avatarImage, inviteCode } =
      req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.status(400).json({ msg: "用户名已经存在" });
    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.status(400).json({ msg: "邮箱已经存在" });
    // 查看数据库中的邀请码是否正确
    const inviteCodeCheck = await Invite.findOne({ inviteCode });
    if (!inviteCodeCheck)
      return res.status(400).json({ msg: "邀请码不正确！" });

    // 查看数据库中的verCode
    const checkVerCode = await Email.findOne({ register_email: email });
    if (checkVerCode) {
      // 取到数据后 先判断时间是否是合法的
      if (new Date().valueOf > checkVerCode.expiration_time.valueOf()) {
        return res.status(400).send({ msg: "验证码已经过期" });
      }
      // 值不同或checkVerCode为null/undefined
      if (checkVerCode.verCode !== verCode) {
        return res.status(400).json({ msg: "验证码错误" });
      }
    } else {
      return res.json({ msg: "请发送验证码" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatarImage,
      inviteCode,
    });
    delete user.password;
    if (user) return res.json({ status: 0, msg: "注册成功", user });
    else return res.status(400).json({ msg: "注册失败" });
  } catch (ex) {
    next(ex);
  }
};

// 是否有权限修改某些东西
module.exports.isAdmin = async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({ username, password });
  if (userData && userData.isAdmin) {
    return res.json({ status: 0, msg: "有权限" });
  } else {
    return res.json({ status: -1, msg: "没有权限" });
  }
};

// // 修改用户头像信息
// module.exports.editAvatar = async (req, res, next) => {
//   try {
//     const { filename, _id } = req.body;
//     // 修改_id的头像
//     User.updateOne(
//       { _id },
//       {
//         $set: {
//           avatarImage: filename,
//         },
//       }
//     )
//       .then((result) => {
//         console.log("更新结果:", result);
//         res.send({
//           err: 0,
//           result,
//           msg: "修改成功",
//         });
//       })
//       .catch((err) => {
//         console.error("更新出错:", err);
//         res.send({
//           err: -1,
//           err,
//           msg: "修改失败",
//         });
//       });
//   } catch (error) {
//     next(error);
//   }
// };

// // 修改昵称
// module.exports.editUsername = async (req, res, next) => {
//   try {
//     const { username, _id } = req.body;
//     User.updateOne(
//       {
//         _id,
//       },
//       {
//         $set: {
//           username,
//         },
//       }
//     )
//       .then((result) => {
//         res.send({
//           err: 0,
//           msg: "修改昵称成功",
//           result,
//         });
//       })
//       .catch((e) => {
//         res.send({
//           err: -1,
//           msg: "修改昵称失败",
//           e,
//         });
//       });
//   } catch (error) {
//     next(error);
//   }
// };
