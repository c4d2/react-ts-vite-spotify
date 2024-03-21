export const UserApiDefinition = {
  login: {
    method: "post" as const,
    url: "/login",
  },
  register: {
    method: "post" as const,
    url: "/register",
  },
  logout: {
    method: "get" as const,
  },
  // 修改数据库头像名字
  editAvatar: {
    method: "post" as const,
    url: "/editAvatar",
  },
  // 修改用户昵称
  editUsername: {
    method: "post" as const,
    url: "/editUsername",
  },
  addInviteCode: {
    methods: "post" as const,
    url: "/invite/addInviteCode",
  },
  // 查看权限
  isAdmin: {
    method: "post" as const,
    url: "/isAdmin",
  },
};
