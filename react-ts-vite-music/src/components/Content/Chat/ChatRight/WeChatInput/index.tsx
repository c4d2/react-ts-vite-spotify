import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import RequestChat from "../../../../../api/RequestChat";
import { ChatApiDefinition } from "../../../../../domains/chat";
import { useParams } from "react-router-dom";
import { SOCKET_URL } from "../../../../../api";
import { io } from "socket.io-client";
import { Input, message } from "antd";
import { runes } from "runes2";
import "./style.scss";
const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例

export default function WeChatInput() {
  const { id } = useParams();
  const [inputvalue, setInputvalue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  //监控enter事件
  const handlekeydown = (event: { keyCode: number }) => {
    //如果input里面没有值，则不发送数据
    if (event.keyCode === 13) {
      //发送数据
      sendmessage();
    }
  };

  //发送数据
  const sendmessage = () => {
    if (inputvalue !== null && inputvalue !== undefined && inputvalue !== "") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      //向后端发起请求
      const res = RequestChat.post(ChatApiDefinition.addMessage.url, {
        id,
        userid: user?._id,
        avatarImage: user?.avatarImage,
        message: inputvalue,
        username: user?.username,
      });
      // socket发送数据请求
      res
        .then((response) => {
          if (response.statusText === "OK") {
            // 把输入的信息给后端
            socket.emit("add-message", {
              message: inputvalue,
              userid: user?._id,
              avatarImage: user?.avatarImage,
              username: user?.username,
              //把当前时间发送给后端
              currenttime: new Date(),
            });
            //把input框里面的数据清空
            setInputvalue("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      //提示input框里面未输入任何数据
      message.warning("不能发送空数据");
    }
  };

  //监控input中的数据
  const messagecontent = (values: {
    target: { value: React.SetStateAction<string> };
  }) => {
    //把输入的数据放在msg中
    //提前判断一下数据信息
    setInputvalue(values.target.value);
  };

  const handleEmojiClick = (values: { native: string }) => {
    //把表情添加到inputvalue中
    const inputv = inputvalue + values.native;
    setInputvalue(inputv);
  };
  return (
    <div className="WeChatInput">
      <div className="emoji">
        <BsEmojiSmileFill
          color="#1ED760"
          size={"25px"}
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
          }}
        />
        {showEmojiPicker && (
          <div style={{ position: "absolute", bottom: "50px" }}>
            <Picker data={data} onEmojiSelect={handleEmojiClick} />
          </div>
        )}
      </div>
      <div className="Input_container">
        <Input
          count={{
            show: true,
            max: 500,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
          value={inputvalue}
          onKeyDown={handlekeydown}
          onClick={() => {
            setShowEmojiPicker(false);
          }}
          onChange={messagecontent}
          type="text"
          className="Input_search"
        />
        <button className="Input_button" onClick={sendmessage}>
          发送
        </button>
      </div>
    </div>
  );
}
