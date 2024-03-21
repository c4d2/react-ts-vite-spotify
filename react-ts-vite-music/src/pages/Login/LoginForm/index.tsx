import React from "react";
import { NavLink } from "react-router-dom";
import { Switch, Button, Form, Input, message } from "antd";
import { useUser } from "../../../api/useUser";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const { Login } = useUser();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const { res } = Login(values.username, values.password);
    res.then((value) => {
      const { data } = value;
      // 存储到localStorage
      message.success(data.msg);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/chat");
    });
  };
  return (
    <div className="LoginForm">
      <div className="form">
        <h1>登录到云音乐</h1>
        <hr />
        <Form onFinish={onSubmit} name="register" className="login-form">
          <Form.Item
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入你的用户名" }]}
            className="item-form"
          >
            <Input type="text" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入你的密码" }]}
            className="item-form"
          >
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            name="remenber"
            label="记住我"
            className="switch-form"
          >
            <Switch defaultChecked className="switch" />
          </Form.Item>
          <Form.Item className="login-button">
            <Button htmlType="submit" className="button">
              登录
            </Button>
          </Form.Item>
        </Form>
        <NavLink to="#">忘记密码？</NavLink>
        <hr />
        <span>
          没有账号？<NavLink to="/register">注册Spotify</NavLink>
        </span>
      </div>
    </div>
  );
};
