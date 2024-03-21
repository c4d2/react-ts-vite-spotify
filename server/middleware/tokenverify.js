const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject({ error: "Token消失啦" });
    } else {
      try {
        const info = jwt.verify(token, process.env.JWT_SECRET);
        resolve(info); // 解析返回的值
      } catch (error) {
        reject({ error: "token无效" });
      }
    }
  });
};

module.exports.tokenverify = (req, res, next) => {
  const url = req._parsedUrl.pathname;
  // const urlArr = ["/api/login", "/api/register"];
  // 开发环境
  const urlArr = [
    "/chatapi/login",
    "/chatapi/register",
    "/chatapi/email/sendEmail",
    "/chatapi/image/upload",
  ];
  if (urlArr.includes(url)) {
    console.log(url);
    next();
    return;
  }
  const token = req.headers["authorization"];
  getToken(token)
    .then((data) => {
      req.user = data; // 将用户信息附加到请求对象
      return User.findById(data._id);
    })
    .then((userData) => {
      if (!userData) {
        return res.status(401).send({ status: 401, msg: "token无效或过期" });
      }
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(401).send({ status: 401, msg: error.error });
    });
};
