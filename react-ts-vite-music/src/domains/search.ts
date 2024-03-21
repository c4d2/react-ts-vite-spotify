export const SearchApiDefinition = {
  // 热搜歌曲列表
  getSearchot: {
    method: "get" as const,
    url: "/search/hot/detail",
  },

  // 搜索结果
  getSearch: {
    method: "get" as const,
    url: "/cloudsearch",
  },

  // 推荐热门搜索
  getNewSong: {
    method: "get" as const,
    url: "/personalized/newsong",
  },

  // 热搜歌单
  getPersonalized: {
    method: "get" as const,
    url: "/personalized",
  },
};
