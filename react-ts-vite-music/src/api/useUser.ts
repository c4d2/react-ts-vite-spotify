import { AxiosRequestConfig } from "axios";
import { UserApiDefinition } from "../domains/user";
import Request from "./RequestChat";
import { message } from "antd";
import { ChatApiDefinition } from "../domains/chat";

export const useUser = () => {
  // 登录
  const Login = (username, password) => {
    const res = Request.post(UserApiDefinition.login.url, {
      username,
      password,
    });
    return {
      res,
    };
  };

  // 注册
  const Register = async (
    username,
    password,
    email,
    verCode,
    imagefile,
    inviteCode
  ) => {
    const formData = new FormData();
    formData.append("imagefile", imagefile.originFileObj);
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const resImage = await Request.post(
      ChatApiDefinition.upload.url,
      formData,
      config
    );
    const { data } = resImage;
    const { imagename } = data;
    const res = await Request.post(UserApiDefinition.register.url, {
      username,
      password,
      email,
      verCode,
      avatarImage: imagename,
      inviteCode,
    });
    return res;
  };

  // 修改头像信息
  const EditAvatar = (filename, _id) => {
    const res = Request.post(UserApiDefinition.editAvatar.url, {
      filename,
      _id,
    });
    res
      .then(() => {
        message.success("修改头像成功");
      })
      .catch(() => {
        message.error("修改头像失败");
      });
  };

  // 添加邀请码
  const AddInviteCode = (inviteCode, comments = "", username, password) => {
    const res = Request.post(UserApiDefinition.addInviteCode.url, {
      inviteCode,
      comments,
      username,
      password,
    });
    res
      .then((value) => {
        message.success(value.data.msg);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return { Login, Register, EditAvatar, AddInviteCode };
};
