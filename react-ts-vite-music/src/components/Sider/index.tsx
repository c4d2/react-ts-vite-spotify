import React, { useEffect, useState } from "react";
import { SiderLink } from "./SiderLink";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { BiChat } from "react-icons/bi";
import { BiCommentAdd } from "react-icons/bi";
import { AddChatForm } from "./AddChatForm";
import RequestChat from "../../api/RequestChat";
import { Tooltip } from "antd";

import "./style.scss";
import { UserApiDefinition } from "../../domains/user";

export const Sider: React.FC = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const res = RequestChat.post(UserApiDefinition.isAdmin.url, {
      username: user.username,
      password: user.password,
    });
    res
      .then((value) => {
        if (value.data.status === 0) {
          setIsAdmin(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  return (
    <div className="Sider">
      <div className="navigator">
        <SiderLink to="/home">
          <MdHomeFilled className="sider-icon" />
          首页
        </SiderLink>
        <SiderLink to="/search">
          <MdSearch className="sider-icon" />
          搜索
        </SiderLink>
      </div>
      <div className="myspace">
        <div className="bar">
          <SiderLink to="/chat">
            <BiChat className="sider-icon" />
            聊天{" "}
            {isAdmin ? (
              <Tooltip title="创建聊天室">
                <BiCommentAdd
                  className="addchat-icon"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                <AddChatForm
                  open={open}
                  onCreate={() => {
                    setOpen(false);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </Tooltip>
            ) : null}
          </SiderLink>
        </div>
        <SiderLink to="/mysong">
          <MdSearch className="sider-icon" />
          歌曲列表
        </SiderLink>
      </div>
    </div>
  );
};
