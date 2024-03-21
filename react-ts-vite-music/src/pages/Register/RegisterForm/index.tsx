import { NavLink, useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { useUser } from "../../../api/useUser";
import { Form, Button, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import RequestChat from "../../../api/RequestChat";
import { EmailApiDefinition } from "../../../domains/email";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { Item } = Form;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const RegisterForm = () => {
  const { Register } = useUser();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(60); // 倒计时时间（以秒为单位）
  const [isCounting, setIsCounting] = useState(false); // 是否正在倒计时
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [imagefile, setImageFile] = useState<UploadFile<any>>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  // 最后提交
  const onSubmit = (values) => {
    // 条件判断
    if (
      !values.username ||
      !values.password ||
      !values.email ||
      !values.verCode ||
      !imagefile
    ) {
      message.warning("头像未上传");
      return;
    }
    const res = Register(
      values.username,
      values.password,
      values.email,
      values.verCode,
      imagefile,
      values.inviteCode
    );
    res
      .then((value) => {
        if (value.data.status === 0) {
          message.success(value.data.msg);
          navigate("/login");
        } else message.warning(value.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 倒计时
  useEffect(() => {
    // 在组件挂载后启动倒计时
    if (isCounting) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // 倒计时结束时执行相应操作
      if (countdown === 0) {
        setIsCounting(false);
        // 执行倒计时结束后的操作
      }

      // 在组件卸载时清除定时器
      return () => {
        clearInterval(interval);
      };
    }
  }, [countdown, isCounting]);

  // 上传之前
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只可以上传图片!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片必须小于2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
    setImageFile(info.file);
    setLoading(false);
  };

  // 上传按扭
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>选择头像</div>
    </div>
  );

  // 发送验证码到邮件
  const onSendEmail = () => {
    if (email === "") {
      message.warning("请输入邮箱验证");
    } else {
      if (!isCounting) {
        setCountdown(60);
        setIsCounting(true);
        // 执行发送验证码的操作
        const sendEmail = RequestChat.post(EmailApiDefinition.sendEmail.url, {
          email,
        });
        sendEmail
          .then((value) => {
            message.success(value.data.msg);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };

  // 预览裁剪
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="RegisterForm">
      <div className="form">
        <Form onFinish={onSubmit} name="register" className="register-form">
          <Item
            valuePropName="imagefile"
            rules={[{ required: true, message: "请选择你的头像" }]}
          >
            <ImgCrop rotationSlider>
              <Upload
                onPreview={onPreview}
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                action="/upload.do"
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ borderRadius: "50%", width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </ImgCrop>
          </Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            name="username"
            label="昵称"
            rules={[{ required: true, message: "请输入你的昵称" }]}
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
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            name="inviteCode"
            label="邀请码"
            rules={[{ required: true, message: "请输入你的邀请码" }]}
            className="item-form"
          >
            <Input type="inviteCode" placeholder="邀请码" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            rules={[{ required: true, message: "请输入你的邮箱" }]}
            className="item-form"
          >
            <Input
              type="text"
              placeholder="邮箱"
              suffix={
                <Button
                  disabled={isCounting}
                  className={isCounting ? "disable-button" : "verCode-button"}
                  onClick={onSendEmail}
                >
                  {isCounting ? `倒计时：${countdown}` : "发送验证码"}
                </Button>
              }
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 24 }}
            labelCol={{ className: "label", span: 24 }}
            name="verCode"
            label="验证码"
            rules={[{ required: true, message: "请输入验证码" }]}
            className="item-form"
          >
            <Input type="verCode" placeholder="验证码" />
          </Form.Item>
          <Form.Item className="register-button">
            <Button htmlType="submit" className="button">
              注册
            </Button>
          </Form.Item>
          <NavLink to="/login">已有账号，去登录</NavLink>
        </Form>
        <hr />
      </div>
    </div>
  );
};
