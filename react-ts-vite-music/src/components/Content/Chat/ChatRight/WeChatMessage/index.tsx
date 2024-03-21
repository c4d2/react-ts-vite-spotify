import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SOCKET_URL, IMAGE_URL } from "../../../../../api";
import RequestChat from "../../../../../api/RequestChat";
import { BiBone } from "react-icons/bi";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例
import "./style.scss";

//引入momentjs
import moment from "moment";
import { io } from "socket.io-client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AxiosRequestConfig } from "axios";
import { ChatApiDefinition } from "../../../../../domains/chat";

export default function WeChatMessage() {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allMeassage, setAllMessage] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getMessage();
  }, []);

  // 获取消息
  const getMessage = () => {
    setPageNumber((num) => num + 1);
    const config: AxiosRequestConfig = {
      params: {
        id,
        pageNumber,
        pageSize: 50,
      },
    };

    const mesData = RequestChat.get(ChatApiDefinition.getMessage.url, config);
    mesData.then((value) => {
      if (!value.data.length && pageNumber) message.warning("历史记录到头了");
      setAllMessage([...allMeassage, ...value.data]);
    });
  };

  // 发送消息时直接添加到页面
  useEffect(() => {
    socket.on("add-message", (message) => {
      setAllMessage([message, ...allMeassage]);
    });
  }, [allMeassage]);
  return (
    <div className="WeChatMessage">
      {allMeassage &&
        allMeassage.map((item, index) => {
          return (
            <div
              key={index}
              className="receive-content"
              style={
                item.userid === user?._id
                  ? { flexDirection: "row-reverse" }
                  : {}
              }
            >
              {item.userid !== user?._id && (
                <div className="img-span">
                  {item.avatarImage ? (
                    <LazyLoadImage
                      className="img"
                      src={IMAGE_URL + item.avatarImage}
                      alt=""
                    />
                  ) : (
                    <Avatar size="large" icon={<UserOutlined />} />
                  )}
                  <span>{item.username}</span>
                </div>
              )}
              <div
                key={index}
                className="receive"
                style={
                  item.userid === user._id ? { alignItems: "flex-end" } : {}
                }
              >
                <div
                  className="receive_message"
                  style={
                    item.userid === user._id
                      ? {}
                      : { backgroundColor: "#0d4e20", color: "#ffffff" }
                  }
                >
                  <p>{item.message}</p>
                </div>
                <span>{moment(item.currenttime).format("HH:mm:ss")}</span>
              </div>
            </div>
          );
        })}
      <div className="history">
        <BiBone
          style={{ height: "1.5rem", width: "1.5rem" }}
          onClick={() => {
            getMessage();
          }}
        />
      </div>
    </div>
  );
}
