import React, { useState } from "react";
import SearchInput from "../Content/Search/SearchInput";
import { useLocation } from "react-router-dom";
import { Avatar, Dropdown, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";
import { IMAGE_URL } from "../../api";
import { AddInviteForm } from "./AddInviteForm";

export const Header: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [open, setOpen] = useState(false);

  // 退出登录
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("成功退出登录");
  };

  // 创建邀请码
  const AddInvite = () => {
    setOpen(true);
  };

  const items = [
    {
      key: "AddInvite",
      label: (
        <a target="_blank" onClick={AddInvite}>
          创建邀请码
        </a>
      ),
    },
    {
      key: "logout",
      label: (
        <a href="/login" target="_blank" onClick={onLogout}>
          退出登录
        </a>
      ),
    },
  ];
  const location = useLocation();
  return (
    <div className="header">
      <AddInviteForm
        open={open}
        onCreate={() => {
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <SearchInput
        disabled={
          /^\/search\/.*/.test(location.pathname) ||
          location.pathname === "/search"
        }
      />
      <Dropdown menu={{ items }}>
        {user.avatarImage ? (
          <div style={{ cursor: "pointer" }} className="username">
            <img
              className="avatar-img"
              src={IMAGE_URL + user.avatarImage}
              alt=""
            />
            <h1>{user.username}</h1>
          </div>
        ) : (
          <Avatar
            style={{ cursor: "pointer" }}
            size="large"
            icon={<UserOutlined />}
          />
        )}
      </Dropdown>
    </div>
  );
};
