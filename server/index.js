const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

// 引入拦截器
const { tokenverify } = require("./middleware/tokenverify");

//引入路由
const uerRoutes = require("./routes/user");
const messageRoutes = require("./routes/messages");
const imageRoutes = require("./routes/upload-image");
const chatroom = require("./routes/chatroom");
const email = require("./routes/email");
const invite = require("./routes/invite");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

//连接数据库
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
// 拦截检查
app.use(tokenverify);

app.use("/chatapi", uerRoutes);
app.use("/chatapi/messages", messageRoutes);
app.use("/chatapi/image", imageRoutes);
app.use("/chatapi/chatroom", chatroom);
app.use("/chatapi/email", email);
app.use("/chatapi/invite", invite);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    // origin: "http://47.109.135.84:81",
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("error", (error) => {
    console.error("socket错误是：", error);
  });
  socket.on("add-message", (message) => {
    io.emit("add-message", message);
    console.log(message);
  });

  socket.on("disconnect", (reason) => {
    if (reason === "io server disconnect") {
      console.log("服务器无法连接到客户端");
    } else {
      console.log("客户端无法连接的原因是：", reason);
    }
  });
});
