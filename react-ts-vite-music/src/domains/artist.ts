export const ArtistApiDefinition = {
  // 获取歌手歌曲
  getArtists: {
    method: "get" as const,
    url: "/artists",
  },
  // 获取歌手详情
  getArtistsDetail: {
    method: "get" as const,
    url: "/artist/detail",
  },
  // 获取歌手专辑
  getArtistsAlbum: {
    method: "get" as const,
    url: "/artist/album",
  },
  // 获取歌手描述
  getArtistsDesc: {
    method: "get" as const,
    url: "/artist/desc",
  },
};
