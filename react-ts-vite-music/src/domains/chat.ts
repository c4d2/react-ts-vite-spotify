export const ChatApiDefinition = {
  // 上传聊天室图片
  upload: {
    method: "post" as const,
    url: "/image/upload",
  },
  // 添加聊天室
  add: {
    method: "post" as const,
    url: "/chatroom/addchatroom",
  },
  // 获取聊天室信息
  get: {
    method: "get" as const,
    url: "/chatroom/getchatroom",
  },
  // 获取聊天室中聊天信息
  getMessage: {
    method: "get" as const,
    url: "/messages/getchatmsg",
  },
  // 添加某个聊天室中的聊天信息
  addMessage: {
    method: "get" as const,
    url: "/messages/addchatmsg",
  },
};
