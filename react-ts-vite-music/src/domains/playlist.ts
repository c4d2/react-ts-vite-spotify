export const PlayListApiDefinition = {
  // 获取热门专辑
  getPlayListHot: {
    method: "get" as const,
    url: "/playlist/hot",
  },
  // 获取
  getPlaylistDetail: {
    method: "get" as const,
    url: "/playlist/detail",
  },
  // 专辑详情
  getAlbum: {
    method: "get" as const,
    url: "/album",
  },
  // 获取榜单歌曲
  getTopPlaylist: {
    method: "get" as const,
    url: "/top/playlist",
  },
};
