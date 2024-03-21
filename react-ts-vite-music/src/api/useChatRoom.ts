import { AxiosRequestConfig } from "axios";
import Request from "./RequestChat";
import { ChatApiDefinition } from "../domains/chat";
import { useQuery } from "react-query";
import { message } from "antd";

export const useAddChatRoom = () => {
  // 添加聊天室
  const add = async (roomname, imagefile, username, password) => {
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

    const resAdd = await Request.post(ChatApiDefinition.add.url, {
      roomname,
      imagename,
      username,
      password,
    });
    message.success(resAdd.data.msg);
    return resAdd.data;
  };

  return {
    add,
  };
};

// 获取所有聊天室信息
export const useGetChatRoom = () => {
  const { data, error, isLoading } = useQuery(
    [ChatApiDefinition.get.url],
    async () => await Request.get(ChatApiDefinition.get.url)
  );

  return {
    data,
    error,
    isLoading,
  };
};

// 添加某个聊天室的聊天信息
export const useAddMessage = (id, username, userid, message, avatarImage) => {
  const res = Request.post(ChatApiDefinition.addMessage.url, {
    id,
    username,
    userid,
    message,
    avatarImage,
  });
  res
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
  return { res };
};

// 获取某个聊天室的聊天信息
export const useGetMessage = (id, pageNumber, pageSize = 5) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
      pageNumber,
      pageSize,
    },
  };
  const { data, error, isLoading } = useQuery(
    [id],
    async () => await Request.get(ChatApiDefinition.getMessage.url, config)
  );

  return {
    data,
    error,
    isLoading,
  };
};
